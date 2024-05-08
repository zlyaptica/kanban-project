"use client";

import styles from "@/styles/Canban.module.css";
import { Status } from "@/components/Status";
import { Action } from "@/utils/Enums";
import { useEffect, useState } from "react";
import { StateNameControl } from "@/components/StateNameControl";
import { Sidebar } from "@/components/Sidebar";
import board from "@/public/board.json";

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
    const res = await fetch(`/api/${boardID}/statuses`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        name: name,
      }),
    });
    const resJson = await res.json();
    setStatuses(await resJson.statusTasks);
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
    async function getStatuses() {
      let res = await fetch(`/api/${boardID}/statuses`);
      let resJson = await res.json();
      setStatuses(resJson.statusTasks);
    }

    getStatuses();
  }, []);
  return (
    <div className={canbanStyles}>
      <div className={"vh-100 d-flex flex-row align-items-start overflow-auto"}>
        {statuses &&
          statuses.map((status, key) => (
            <div key={key}>
              <Status status={status} openTaskInfo={openTaskInfo} />
            </div>
          ))}
        <div className={"p-2 m-2"}>
          <StateNameControl
            status={Action.createState}
            nameControlHeader="Создать новый статус"
            act="Создать новый статус"
            createStatus={createStatus}
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
