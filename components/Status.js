import styles from "@/styles/Status.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { Action } from "@/utils/Enums";
import { StateNameControl } from "./StateNameControl";
import { Task } from "./Task";
import { StatusMenu } from "./StatusMenu";
import { useEffect, useState } from "react";

const Status = (props) => {
  const [status, setStatus] = useState("");
  //   const [currentState, setCurrentState] = useState(null)
  //   const [currentTask, setCurrentTask] = useState(null)
  //   const [isDraggedTask, setIsDraggedTask] = useState(false)

  //   const deleteState = async (state) => {
  //       if (state.tasks.length != 0) {
  //           props.setRemovableState(state)
  //           props.setDeleteNotEmptyBoardPopupActive(true)
  //       } else {
  //           const body = {
  //               is_save_tasks: false,
  //           }
  //           props.setStates(await DeleteState(state._id, body))
  //       }
  //   }

  //   const updateStateName = async (name, stateID) => {
  //       props.setStates(await RenameState(name, stateID))
  //   }

  //   const dragStateOverHandler = (e) => {
  //       e.preventDefault()
  //   }

  //   const dragStateLeaveHandler = (e) => {
  //   }

  //   const dragStateStartHandler = (e, state) => {
  //       setCurrentState(state)
  //   }

  //   const dragStateEndHandler = (e) => {
  //   }

  //   const dropStateHandler = async (e, state) => {
  //       e.preventDefault()
  //       if (isDraggedTask) {
  //           if (state._id != currentState._id && state.tasks.length == 0) {
  //               const body = {
  //                   currentStateID: currentState._id,
  //                   newBoardID: state._id,
  //                   currentTaskIndex: currentTask.index,
  //                   newTaskIndex: 0,
  //               }
  //               props.setStates(await UpdateTaskIndex(currentTask._id, body))
  //               setCurrentState(null)
  //               setCurrentTask(null)
  //               setIsDraggedTask(false)
  //           }
  //       } else {
  //           if (state.index != currentState.index) {
  //               const body = {
  //                   newID: state._id, // идентификатор доски, вместо которой встанет перетаскивыемый элемент
  //                   currentIndex: currentState.index,
  //                   newIndex: state.index,
  //               }
  //               props.setStates(await UpdateStateIndex(currentState._id, body))
  //           }
  //       }

  //       setCurrentState(null)
  //   }

  //   const dragTaskOverHandler = async (e) => {
  //       // e.preventDefault()
  //   }

  //   const dragTaskLeaveHandler = async (e) => {

  //   }

  //   const dragTaskStartHandler = async (e, state, task) => {
  //       setIsDraggedTask(true)

  //       setCurrentState(state)
  //       setCurrentTask(task)
  //   }

  //   const dragTaskEndHandler = async (e, state, task) => {
  //       setIsDraggedTask(false)
  //       setCurrentState(null)
  //       setCurrentTask(null)
  //   }

  //   const dropTaskHandler = async (e, state, task) => {
  //       e.preventDefault()
  //       if (!(state.index == currentState.index && task.index == currentTask.index)) {
  //           const body = {
  //               currentStateID: currentState._id,
  //               newBoardID: state._id,
  //               currentTaskIndex: currentTask.index,
  //               newTaskIndex: task.index,
  //           }
  //           setCurrentState(null)
  //           setCurrentTask(null)

  //           props.setStates(await UpdateTaskIndex(currentTask._id, body))
  //       }
  //       setIsDraggedTask(false)
  //   }

  const createTask = async (taskName) => {
    let user;
    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("user"));
    }
    const response = await fetch(
      `/api//board/${props.boardID}/statuses/${props.status._id}/tasks`,
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
    if (props.status.tasks.length != 0) {
      // props.setRemovableState(state);
      // props.setDeleteNotEmptyBoardPopupActive(true);
    } else {
      let user;
      if (typeof window !== "undefined") {
        user = JSON.parse(localStorage.getItem("user"));
      }
      const response = await fetch(
        `/api/board/${props.boardID}/statuses/${props.status._id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            is_save_tasks: false,
            board_id: props.boardID,
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
  };

  const updateStatusName = async (name) => {
    let user;
    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("user"));
    }
    if (user) {
      const response = await fetch(
        `/api/board/${props.boardID}/statuses/${props.status._id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            author_id: user._id,
            name: name,
            type: "name",
          }),
        }
      );
      const data = await response.json();
      console.log(data.message)
      props.setStatuses(data.boardData);
      setStatus(data.status);
    }
  };

  const updateStatusType = async (type) => {
    let user;
    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("user"));
    }
    if (user) {
      const response = await fetch(
        `/api/board/${props.boardID}/statuses/${props.status._id}`,
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
    }
  };

  let statusColor;
  if (props.status.type == "TODO") statusColor = styles.bgColorTODO;
  if (props.status.type == "DOING") statusColor = styles.bgColorDOING;
  if (props.status.type == "DONE") statusColor = styles.bgColorDONE;

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  return (
    <div className={styles.statusBlock + " " + statusColor}>
      <div className={styles.stateHeader}>
        <div className={styles.stateNameControl}>
          <StateNameControl
            className={styles.stateNameControl}
            action={Action.updateStateName}
            nameControlHeader={status.name}
            inputValue={status.name}
            act="Введите название статуса"
            confirmButton={updateStatusName}
          />
        </div>
        <StatusMenu
          status={status}
          deleteStatus={deleteStatus}
          updateStatusType={updateStatusType}
        />
      </div>
      <div className={styles.tasks}>
        <div className={styles.createTask}>
          <StateNameControl
            action={Action.createTask}
            nameControlHeader="Создать задачу"
            act="Создать задачу"
            tasks={status.tasks}
            confirmButton={createTask}
          />
        </div>
        {status.tasks &&
          status.tasks.map((task, key) => (
            <div key={key} className={styles.task}>
              <Task task={task} openTaskInfo={props.openTaskInfo} />
            </div>
          ))}
      </div>
    </div>
  );
};

export { Status };
