'use client'

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';



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

const Response = async (msg) => {
    let res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify(msg),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let resJson = await res.json()
    console.log("resp")
    console.log(resJson.messageID)
    return resJson
}

export default function Chat() {

    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async function getdata() {
            let res = await fetch('/api/chat')
            let resJson = await res.json()
            console.log("srem0", resJson);
            setMessages(current => [...current, ...resJson])
        };
        // Create a socket connection
        getdata()
        socket.connect()
        // Listen for incoming messages
        socket.on('connect', () => {
            console.log(socket.id)
            getdata()
        });
        socket.on('broadcastNewMessage', (msg) => {
            setMessages(current => [...current, msg])
        })

        // Clean up the socket connection on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    const handleChange = (event) => {
        setNewMessage(event.target.value);
    }
    const handleBtnClick = () => {
        if (newMessage != '') {
            // сюда надо полностью сформированное сообщение согласно модели Message сейчас заглушка
            let Msg = {
                'text': newMessage,
                'authorData': {
                    "name": "Илья Шимозёров"
                },
                'date': new Date(),
            }
            

            setMessages(current => [...current, Msg])
            setNewMessage('');
            Response(Msg).then((result)=>{Msg._id=result.messageID})
            console.log(Msg)
            socket.emit("newMessage", Msg)
        }
    }
    const deleteBtnClick = (message) =>{
        setMessages(messages.filter((el)=>{return el._id != message._id}))
        console.log(message)
        let s = "new ObjectId('662ecc7520254c1080dc71d6')"

    }
    const EditBtnClick = (message) =>{
        setNewMessage(message.text)    
    }

    return (
        <div className='m-5'>
            <ol className="list-group list-group-numbered">
                {

                    messages.map((message, key) =>
                        <li key={key} className="list-group-item d-flex justify-content-between align-items-start">
                            <div className='col'>
                                <div className="ms-2 me-auto">
                                    <div>
                                        <span className="fw-bold">{message.authorData.name} </span>
                                        <span className="fw-lighter">{getLocalTime(message.date)}</span>
                                        <button type="button" className="btn btn-primary btn-sm pull-right float-end"onClick={()=>{deleteBtnClick(message)}}>Удалить</button>
                                        <button type="button" className="btn btn-primary btn-sm pull-right float-end"onClick={()=>{EditBtnClick(message)}}>Редактировать</button>
                                    </div>
                                    {message.text}
                                </div>
                            </div>                         
                        </li>)

                }

            </ol>
            <div>
                <textarea value={newMessage} onChange={handleChange}></textarea>
            </div>
            <div>
                <button type="button" onClick={handleBtnClick}>отправить</button>
            </div>



        </div>
    )
}