"use client";

import styles from "@/styles/Canban.module.css";
import { Status } from "@/components/Status";
import { Action } from "@/utils/Enums";
import { useEffect, useState } from "react";
import { StateNameControl } from "@/components/StateNameControl";
import { Sidebar } from "@/components/Sidebar";

export default function Board({ params }) {
  const boardID = params.board_id;
  const [statuses, setStatuses] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentOpenTaskSidebarData, setCurrentOpenTaskSidebarData] =
    useState(null);

  const canbanStyles = isSidebarOpen
    ? styles.canbanAndActiveSidebar
    : styles.canbanAndInactiveSidebar;

  const sidebarStyles = isSidebarOpen
    ? styles.sidebar + " " + styles.sidebarOpen
    : styles.sidebar;

  const createStatus = async (name) => {
    let user
    if (typeof window !== "undefined") {
        user = JSON.parse(localStorage.getItem("user"))
    }

    const response = await fetch(`/api/board/${boardID}/statuses`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        name: name,
        author_id: user._id,
      }),
    });
    const data = await response.json();
    if (response.status == 403) {
      console.log(data.message);
    } else if (response.status == 201) {
      console.log(data.message);
      setStatuses(await data.boardData);
    }
  };

  const openTaskInfo = (task) => {
    console.log(task);
    setCurrentOpenTaskSidebarData(task);
    setIsSidebarOpen(true);
  };

  const setIsDone = async (taskID, isCompleted) => {
    console.log("тип пометили");
  };

  useEffect(() => {
    async function getStatuses(user_id) {
      let response = await fetch(`/api/users/${user_id}/boards`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          board_id: boardID,
        }),
      });
      let data = await response.json();
      response = await fetch(`/api/board/${boardID}/statuses`);
      data = await response.json();
      setStatuses(data.statusTasks);
    }

    let user;
    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        getStatuses(user._id);
      } else {
        console.log("вы не авторизованы");
      }
    }
  }, []);
  return (
    <div className={canbanStyles}>
      <div className={"vh-100 d-flex flex-row align-items-start overflow-auto"}>
        {statuses &&
          statuses.map((status, key) => (
            <div key={key}>
              <Status status={status} openTaskInfo={openTaskInfo} boardID={boardID} setStatuses={setStatuses}/>
            </div>
          ))}
        <div className={"p-2 m-2"}>
          <StateNameControl
            status={Action.createState}
            nameControlHeader="Создать новый статус"
            act="Создать новый статус"
            confirmButton={createStatus}
          />
        </div>
      </div>
      <div className={sidebarStyles}>
        {isSidebarOpen ? (
          <Sidebar
            task={currentOpenTaskSidebarData}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        ) : null}
      </div>
    </div>
  );
}
