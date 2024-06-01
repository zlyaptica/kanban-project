import styles from "@/styles/Status.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Action } from "@/utils/Enums";
import { StateNameControl } from "./StateNameControl";
import { Task } from "./Task";
import { StatusMenu } from "./StatusMenu";
import { useEffect, useState } from "react";

const Status = (props) => {
  const [user, setUser] = useState("");
  const [status, setStatus] = useState(props.status);

  const createTask = async (taskName) => {
    if (!props.isAdmin) return

    const response = await fetch(
      `/api/board/${props.boardData._id}/statuses/${props.status._id}/tasks`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          boardID: status._id,
          name: taskName,
          is_completed: false,
          creator: user.name,
          created_at: new Date(),
          start_date: "",
          deadline: "",
          description: "",
          priority: 0,
          doer: "",
          index: status.tasks.length,
          author_id: user._id,
        }),
      }
    );
    const data = await response.json();
    if (response.status == 403) {
      console.log(data.message);
    } else if (response.status == 201) {
      setStatus(data.statusData);
    }
  };

  const deleteStatus = async () => {
    if (!props.isAdmin) return

    if (props.status.tasks.length != 0) {
      // props.setRemovableState(state);
      // props.setDeleteNotEmptyBoardPopupActive(true);
    } else {
      if (user) {
        const response = await fetch(
          `/api/board/${props.boardData._id}/statuses/${props.status._id}`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
              is_save_tasks: false,
              board_id: props.boardData._id,
              author_id: user._id,
            }),
          }
        );
        const data = await response.json();
        if (response.status == 403) {
          console.log(data.message);
        } else if (response.status == 200) {
          console.log(data.boardData);
          props.setStatuses(await data.boardData);
        }
      }
    }
  };

  const updateStatusName = async (name) => {
    if (!props.isAdmin) return

    const response = await fetch(
      `/api/board/${props.boardData._id}/statuses/${props.status._id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          author_id: user._id,
          name: name,
          field: "name",
        }),
      }
    );
    const data = await response.json();
    props.setStatuses(data.boardData);
    setStatus(data.status);
  };

  const updateStatusType = async (type) => {
    if (!props.isAdmin) return

    const response = await fetch(
      `/api/board/${props.boardData._id}/statuses/${props.status._id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          author_id: user._id,
          type: type,
          field: "type",
        }),
      }
    );
    const data = await response.json();
    props.setStatuses(data.boardData);
    setStatus(data.status);
  };

  let statusColor;
  if (props.status.type == "TODO") statusColor = styles.bgColorTODO;
  if (props.status.type == "DOING") statusColor = styles.bgColorDOING;
  if (props.status.type == "DONE") statusColor = styles.bgColorDONE;

  useEffect(() => {
    if (props.user) {
      setUser(props.user);

    }
  }, [props.status, props.user]);

  return (
    <div className={styles.statusBlock + " " + statusColor}>
      <div className={styles.stateHeader}>
        <div className={styles.stateNameControl}>
          <StateNameControl
            className={styles.stateNameControl}
            action={Action.updateStateName}
            isAdmin={props.isAdmin}
            nameControlHeader={status.name}
            inputValue={status.name}
            act="Введите название статуса"
            confirmButton={updateStatusName}
          />
        </div>
        {props.isAdmin ?
          <StatusMenu
            status={status}
            deleteStatus={deleteStatus}
            updateStatusType={updateStatusType}
          />
          : null}
      </div>
      <div className={styles.tasks}>
        <div className={styles.createTask}>
          {props.isAdmin ?
            <StateNameControl
              isAdmin={props.isAdmin}
              action={Action.createTask}
              nameControlHeader="Создать задачу"
              act="Создать задачу"
              tasks={status.tasks}
              confirmButton={createTask}
            /> : null}
        </div>
        {status.tasks &&
          status.tasks.map((task, key) => (
            <div
              key={key}
              className={styles.task}
              draggable={props.isAdmin}
              onDragOver={(e) => props.dragOverTaskHandler(e)}
              onDragLeave={(e) => props.dragLeaveTaskHandler(e)}
              onDragStart={(e) => props.dragStartTaskHandler(e, status, task)}
              onDragEnd={(e) => props.dragEndTaskHandler(e)}
              onDrop={(e) => props.dropTaskHandler(e, status, task)}
            >
              <Task
                user={props.user}
                isAdmin={props.isAdmin}
                task={task}
                openTaskInfo={props.openTaskInfo}
                setStatuses={props.setStatuses}
                setCurrentOpenTaskSidebarData={
                  props.setCurrentOpenTaskSidebarData
                }
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export { Status };
