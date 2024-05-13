import styles from "@/styles/Status.module.css";
import "bootstrap/dist/css/bootstrap.css";
// import { useState } from 'react'
import { Action } from "@/utils/Enums";
import { StateNameControl } from "./StateNameControl";
import { Task } from "./Task";
import { StatusMenu } from "./StatusMenu";

const Status = (props) => {
  //   const [currentState, setCurrentState] = useState(null)
  //   const [currentTask, setCurrentTask] = useState(null)
  //   const [isDraggedTask, setIsDraggedTask] = useState(false)

  //   const createTask = async (stateID, tasks, taskName) => {
  //       const body = {
  //           boardID: stateID,
  //           name: taskName,
  //           is_completed: false,
  //           creator: 'maxim',
  //           created_at: new Date(),
  //           start_date: '',
  //           deadline: '',
  //           description: '',
  //           priority: '——',
  //           index: tasks.length,
  //       }
  //       props.setStates(await CreateTask(body))
  //   }

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

  const createTask = (stateID, tasks, taskName) => {
    console.log("типа создали");
  };

  const deleteStatus = async (state) => {
    if (props.status.tasks.length != 0) {
      // props.setRemovableState(state);
      // props.setDeleteNotEmptyBoardPopupActive(true);
    } else {
      let user
      if (typeof window !== "undefined") {
          user = JSON.parse(localStorage.getItem("user"))
      }
      console.log("props.boardID", props.boardID)
      console.log("user._id", user._id)
      const response = await fetch(`/api/board/${props.boardID}/statuses/${props.status._id}`, {
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
      })
      const data = await response.json();
      if (response.status == 403) {
        console.log(data.message);
      } else if (response.status == 200) {
        console.log(data.boardData);
        props.setStatuses(await data.boardData);
      }
    }
  };

  const updateStateName = (name, stateID) => {
    console.log("типа обновили");
  };

  let statusColor;
  if (props.status.type == "TODO") statusColor = styles.bgColorTODO;
  if (props.status.type == "DOING") statusColor = styles.bgColorDOING;
  if (props.status.type == "DONE") statusColor = styles.bgColorDONE;

  return (
    <div className={styles.statusBlock + " " + statusColor}>
      <div className={styles.stateHeader}>
        <div className={styles.stateNameControl}>
          <StateNameControl
            className={styles.stateNameControl}
            action={Action.updateStateName}
            statusID={props.status._id}
            nameControlHeader={props.status.name}
            act="Введите название статуса"
          />
        </div>
        <StatusMenu status={props.status} deleteStatus={deleteStatus}/>
      </div>
      <div className={styles.tasks}>
        <div className={styles.createTask}>
          <StateNameControl
            action={Action.createTask}
            nameControlHeader="Создать задачу"
            act="Создать задачу"
            tasks={props.status.tasks}
          />
        </div>
        {props.status.tasks &&
          props.status.tasks.map((task, key) => (
            <div key={key} className={styles.task}>
              <Task task={task} openTaskInfo={props.openTaskInfo} />
            </div>
          ))}
      </div>
    </div>
  );
};

export { Status };
