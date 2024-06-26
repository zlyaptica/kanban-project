"use client";

import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import styles from "@/styles/Chat.module.css"
import deleteIcon from "@/public/deleteIcon.svg"
import editIcon from "@/public/editIcon.svg"
import Image from 'next/image';

const socket = io();

function getLocalTime(date) {
  const localTime = new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  return localTime;
}

const Request = async (msg, reqType) => {
  let res = await fetch("/api/chat", {
    method: reqType,
    body: JSON.stringify(msg),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let resJson = await res.json();
  return resJson;
};

export default function Chat({ params }) {
  const boardID = params.board_id;

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [editMessage, setEditMessages] = useState({});
  const [currentUser, setCurrentUser] = useState({})
  const messagesRef = useRef(messages);

  useEffect(() => {
    async function Get() {
      let res = await fetch(`/api/chat/${boardID}`);
      let resJson = await res.json();
      console.log("srem0", resJson);
      setMessages((current) => [...current, ...resJson]);
      messagesRef.current = [...messagesRef.current, ...resJson];
    }
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    console.log(currentUser._id)
    const isAuthenticatedUser = localStorage.getItem("isAuthenticatedUser");
    if (isAuthenticatedUser) {
      Get();
    }

    // Create a socket connection
    socket.connect();
    // Listen for incoming messages
    socket.on("connect", () => { socket.emit("join", boardID) });
    socket.on("broadcastNewMessage", (newMsg) => {
      messagesRef.current = [...messagesRef.current, newMsg];
      setMessages([...messagesRef.current]);
    });
    socket.on("broadcastDelete", (msg) => {
      console.log("deleteMessage");
      console.log(msg);
      messagesRef.current = [
        ...messagesRef.current.filter((el) => {
          return el._id != msg._id;
        }),
      ];
      console.log("srem2", messagesRef.current);
      setMessages([...messagesRef.current]);
    });
    socket.on("broadcastUpdate", (msg) => {
      console.log("updateMessage");
      console.log(messagesRef.current);
      console.log(msg);
      let index = messagesRef.current.findIndex((obj) => obj._id == msg._id);
      console.log(index);
      if (index != -1) {
        messagesRef.current[index] = msg;
        setMessages([...messagesRef.current]);
      }
    });
    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleBtnClick = () => {
    if (newMessage != "") {
      let Msg = {
        text: newMessage,
        authorData: { _id: currentUser._id, name: currentUser.name },
        date: new Date(),
        board: boardID
      };
      console.log(Msg);
      Request(Msg, "PUT").then((result) => {
        Msg._id = result.messageID;
        console.log(messagesRef.current);
        socket.emit("newMessage", Msg);
        messagesRef.current = [...messagesRef.current, Msg];
        setMessages([...messagesRef.current]);
        setNewMessage("");
      });
    }
  };
  const deleteBtnClick = (message) => {
    Request(message, "DELETE").then((result) => {
      if ((result.status = 200)) {
        console.log(message)

        socket.emit("deleteMessage", messagesRef.current.find((el) => {
          return el._id == message._id;
        })
        );
        messagesRef.current = messagesRef.current.filter((el) => {
          return el._id != message._id;
        });
        setMessages([...messagesRef.current]);
      } else {
        console.log("Ooops something gone wrong", result.status);
      }
    });
  };

  const handleEditBtnClick = () => {
    Request(editMessage, "PATCH").then((result) => {
      if ((result.status = 200)) {
        let index = messagesRef.current.findIndex(
          (obj) => obj._id == editMessage._id
        );
        let msgs = [...messagesRef.current];
        msgs[index] = editMessage;
        setMessages(msgs);
        messagesRef.current = msgs;
        console.log(msgs[index]);
        socket.emit("updateMessage", msgs[index]);
      } else {
        console.log("Ooops something gone wrong", result.status);
      }
      setEditMessages({});
    });
  };

  return (
    <div className="m-5">
      <ol className="list-group list-group-numbered">
        {messagesRef.current.map((message, key) => (
          <li
            key={key}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div className="col">
              <div className="ms-2 me-auto">
                <div>
                  <span className="fw-bold">{message.authorData.name} </span>
                  {(currentUser._id == message.authorData._id) ? (
                    <Image
                      src={deleteIcon}
                      className={styles.ImgBtn}
                      height={15}
                      width={15}
                      onClick={() => {
                        deleteBtnClick(message);
                      }}
                    />
                  ) : null}
                  {(currentUser._id == message.authorData._id) ? (
                    <Image
                      src={editIcon}
                      className={styles.ImgBtn}
                      height={15}
                      width={15}
                      onClick={() => {
                        setEditMessages(message);
                      }}
                    />
                  ) : null}
                  <span className="fw-lighter">
                    {getLocalTime(message.date)}
                  </span>

                </div>
                {message.text}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div hidden={Object.keys(editMessage) != 0}>
        <div>
          <textarea
            className={styles.TextareaClass}
            value={newMessage}
            onChange={(event) => {
              setNewMessage(event.target.value);
            }}
          ></textarea>
        </div>
        <div>
          <button 
          type="button" 
          className="btn btn-primary btn-sm"
          onClick={handleBtnClick}>
            Отправить
          </button>
        </div>
      </div>
      <div hidden={Object.keys(editMessage) == 0}>
        <div>
          <textarea
            className={styles.TextareaClass}
            value={editMessage.text}
            onChange={(event) => {
              setEditMessages({ ...editMessage, text: event.target.value });
            }}
          ></textarea>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleEditBtnClick}>
            Редактировать
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm mx-1"
            onClick={() => {
              setEditMessages({});
            }}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
