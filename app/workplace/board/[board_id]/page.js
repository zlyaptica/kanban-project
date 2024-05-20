"use client";

import styles from "@/styles/Canban.module.css";
import { Status } from "@/components/Status";
import { Action } from "@/utils/Enums";
import { useEffect, useState } from "react";
import { StateNameControl } from "@/components/StateNameControl";
import { Sidebar } from "@/components/Sidebar";
import { navigateToWorkplace } from "@/app/actions";
import { DeleteNotEmptyBoard } from "@/components/DeleteNotEmptyBoardForm";
import { Popup } from "@/components/Popup";

export default function Board({ params }) {
  const boardID = params.board_id;

  const [user, setUser] = useState("");
  const [statuses, setStatuses] = useState([]);
  const [boardData, setBoardData] = useState(""); // данные о сущности Доска

  const [currentStatus, setCurrentStatus] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [isDraggedTask, setIsDraggedTask] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [removableData, setRemovableData] = useState("");
  const [deleteNotEmptyObjectPopupActive, setDeleteNotEmptyObjectPopupActive] =
    useState(false);

  const [editBoardNameInputValue, setEditBoardNameInputValue] = useState("");
  const [editBoardNameInputActive, setEditBoardNameInputActive] =
    useState(false);
  const [currentOpenTaskSidebarData, setCurrentOpenTaskSidebarData] =
    useState(null);

  const canbanStyles = isSidebarOpen
    ? styles.canbanAndActiveSidebar
    : styles.canbanAndInactiveSidebar;

  const sidebarStyles = isSidebarOpen
    ? styles.sidebar + " " + styles.sidebarOpen
    : styles.sidebar;

  const createStatus = async (name) => {
    if (user) {
      const response = await fetch(`/api/board/${boardID}/statuses`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name: name,
          author_id: user._id,
          type: "TODO",
        }),
      });
      const data = await response.json();
      if (response.status == 403) {
        console.log(data.message);
      } else if (response.status == 201) {
        console.log(data.message);
        setStatuses(await data.boardData);
      }
    }
  };

  const updateBoardName = async () => {
    if (user) {
      const response = await fetch(`/api/board/${boardID}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          author_id: user._id,
          name: editBoardNameInputValue,
        }),
      });
      const data = await response.json();
      if (response.status == 403) {
        console.log(data.message);
      } else if (response.status == 200) {
        console.log(data);
        setBoardData(data.updatedBoard);
      }
    }
    setEditBoardNameInputActive(false);
    setEditBoardNameInputValue("");
  };

  const deleteBoard = async () => {
    if (user) {
      if (!statuses) {
        const response = await fetch(`/api/board/${boardID}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            author_id: user._id,
            empty_board: true,
          }),
        });
        const data = await response.json();
        console.log(data);
        if (response.status == 403) {
          console.log(data.message);
        } else if (response.status == 200) {
          navigateToWorkplace();
        }
      } else {
        setRemovableData(statuses);
        setDeleteNotEmptyObjectPopupActive(true);
      }
    }
  };

  const openTaskInfo = (task) => {
    setCurrentOpenTaskSidebarData(task);
    setIsSidebarOpen(true);
  };

  const startEditBoardName = () => {
    setEditBoardNameInputActive(true);
    setEditBoardNameInputValue(boardData.name);
  };

  const endEditBoardName = () => {
    setEditBoardNameInputActive(false);
    setEditBoardNameInputValue("");
  };

  const dragOverStatusHandler = (e) => {
    e.preventDefault();
  };

  const dragLeaveStatusHandler = (e) => {};

  const dragStartStatusHandler = (e, status) => {
    setCurrentStatus(status);
  };

  const dragEndStatusHandler = (e) => {};

  const dropStatusHandler = async (e, status) => {
    e.preventDefault();
    if (isDraggedTask) {
      if (status._id != currentStatus._id && status.tasks.length == 0) {
        const response = await fetch(`/api/tasks/${currentTask._id}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            author_id: user._id,
            currentStatusID: currentStatus._id,
            newStatusID: status._id,
            currentTaskIndex: currentTask.index,
            setIndex: 0,
            field: "index",
          }),
        });
        const data = await response.json();
        if (response.status == 403) {
          console.log(data.message);
        } else if (response.status == 200) {
          setStatuses(data.boardData);
        }
        setCurrentStatus(null);
        setCurrentTask(null);
        setIsDraggedTask(false);
      }
    } else {
      if (status.index != currentStatus.index) {
        const body = {
          newID: status._id, // идентификатор доски, вместо которой встанет перетаскивыемый элемент
          currentIndex: currentStatus.index,
          newIndex: status.index,
        };
        props.setStates(await UpdateStateIndex(currentStatus._id, body));
      }
    }

    setCurrentStatus(null);
  };

  const dragOverTaskHandler = async (e) => {
    e.preventDefault();
    if (e.target.className == styles.task) {
      e.target.style.boxShadow = "0 2px 3px gray";
    }
  };

  const dragLeaveTaskHandler = async (e) => {
    e.target.style.boxShadow = "none";
  };

  const dragStartTaskHandler = async (e, status, task) => {
    setIsDraggedTask(true);
    setCurrentStatus(status);
    setCurrentTask(task);
  };

  const dragEndTaskHandler = async (e) => {
    setIsDraggedTask(false);
    e.target.style.boxShadow = "none";
  };

  const dropTaskHandler = async (e, status, task) => {
    e.preventDefault();
    if (user) {
      if (
        !(
          status.index == currentStatus.index && task.index == currentTask.index
        )
      ) {
        const response = await fetch(`/api/tasks/${currentTask._id}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            author_id: user._id,
            currentStatusID: currentStatus._id,
            newStatusID: status._id,
            currentTaskIndex: currentTask.index,
            setIndex: task.index,
            field: "index",
          }),
        });
        const data = await response.json();
        if (response.status == 403) {
          console.log(data.message);
        } else if (response.status == 200) {
          setStatuses(data.boardData);
        }
      }
    }
    setCurrentStatus(null);
    setCurrentTask(null);
    setIsDraggedTask(false);
  };

  useEffect(() => {
    async function getStatuses(isAuthorized, user_id) {
      if (isAuthorized) {
        const response = await fetch(`/api/users/${user_id}/boards`, {
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
        console.log(data.message);
      }
      const response = await fetch(`/api/board/${boardID}/statuses`);
      const data = await response.json();
      setStatuses(data.statusTasks);
      setBoardData(data.board);
    }
    let user;
    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("user"));
    }
    if (user) setUser(user);

    if (user) {
      getStatuses(true, user._id);
    } else {
      getStatuses(false);
    }
  }, []);
  return (
    <div className={canbanStyles}>
      <div className={"d-flex flex-column"}>
        <div className={"pt-1"}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light bg-gradient">
            <div className="container-fluid">
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto align-items-center">
                  {!editBoardNameInputActive ? (
                    <li className="nav-item">
                      <h5 className={styles.boardName}>{boardData.name}</h5>
                    </li>
                  ) : (
                    <input
                      type="text"
                      placeholder="Введите название..."
                      value={editBoardNameInputValue}
                      onChange={(e) =>
                        setEditBoardNameInputValue(e.target.value)
                      }
                    />
                  )}
                  <li className="nav-item">
                    {!editBoardNameInputActive ? (
                      <button
                        className="nav-link"
                        onClick={() => startEditBoardName()}
                      >
                        Изменить название
                      </button>
                    ) : (
                      <button
                        className="nav-link"
                        onClick={() => updateBoardName()}
                      >
                        Сохранить
                      </button>
                    )}
                  </li>
                  <li className="nav-item">
                    {!editBoardNameInputActive ? (
                      <button
                        className="nav-link"
                        onClick={() => deleteBoard()}
                      >
                        Удалить доску
                      </button>
                    ) : (
                      <button
                        className="nav-link"
                        onClick={() => endEditBoardName()}
                      >
                        Отменить
                      </button>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div
          className={"vh-100 d-flex flex-row align-items-start overflow-auto"}
        >
          {statuses &&
            statuses.map((status, key) => (
              <div
                key={key}
                draggable={true}
                onDragOver={(e) => dragOverStatusHandler(e)}
                onDragLeave={(e) => dragLeaveStatusHandler(e)}
                onDragStart={(e) => dragStartStatusHandler(e, status)}
                onDragEnd={(e) => dragEndStatusHandler(e)}
                onDrop={(e) => dropStatusHandler(e, status)}
              >
                <Status
                  user={user}
                  status={status}
                  openTaskInfo={openTaskInfo}
                  boardID={boardID}
                  setStatuses={setStatuses}
                  setCurrentOpenTaskSidebarData={setCurrentOpenTaskSidebarData}
                  dragOverTaskHandler={dragOverTaskHandler}
                  dragLeaveTaskHandler={dragLeaveTaskHandler}
                  dragStartTaskHandler={dragStartTaskHandler}
                  dragEndTaskHandler={dragEndTaskHandler}
                  dropTaskHandler={dropTaskHandler}
                />
              </div>
            ))}
          <div className={"p-2 m-2"}>
            <StateNameControl
              action={Action.createState}
              nameControlHeader="Создать новый статус"
              act="Создать новый статус"
              confirmButton={createStatus}
            />
          </div>
        </div>
      </div>
      <div className={sidebarStyles}>
        {isSidebarOpen ? (
          <Sidebar
            user={user}
            task={currentOpenTaskSidebarData}
            setTask={setCurrentOpenTaskSidebarData}
            setIsSidebarOpen={setIsSidebarOpen}
            setStatuses={setStatuses}
          />
        ) : null}
      </div>
      <Popup
        active={deleteNotEmptyObjectPopupActive}
        setActive={setDeleteNotEmptyObjectPopupActive}
      >
        <DeleteNotEmptyBoard
          data={removableData}
          setActive={setDeleteNotEmptyObjectPopupActive}
          type="board"
          boardID={boardID}
        />
      </Popup>
    </div>
  );
}
