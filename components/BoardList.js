import styles from "@/styles/BoardList.module.css";
import 'bootstrap/dist/css/bootstrap.css'

import deleteIcon from "../public/deleteIcon.svg";
import Image from "next/image";
// import { useState } from 'react'
import { Action } from "@/utils/Enums";
import { StateNameControl } from "./StateNameControl";
import { Task } from "./Task";

const BoardsList = (props) => {
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

  const deleteState = (state) => {
    console.log("типа удалили");
  };

  const updateStateName = (name, stateID) => {
    console.log("типа обновили");
  };

  return (
    <div className={"d-flex"}>
      {props.statuses &&
        props.statuses.map((status) => (
          <div key={status._id} className="w-200">
            <div className={styles.stateHeader}>
              <div className={styles.stateNameControl}>
                <StateNameControl
                  action={Action.updateStateName}
                  statusID={status._id}
                  nameControlHeader={status.name}
                  confirmButton={updateStateName}
                  act="Изменить"
                />
              </div>
              <Image
                className={styles.deleteState}
                onClick={() => deleteState(state)}
                src={deleteIcon}
                alt={"delete state"}
              />
            </div>
            <div className={styles.tasks}>
              {status.tasks &&
                status.tasks.map((task) => (
                  <div
                    key={task._id}
                    className={styles.task}
                    draggable={true}
                    onDragOver={(e) => dragTaskOverHandler(e)}
                    onDragLeave={(e) => dragTaskLeaveHandler(e)}
                    onDragStart={(e) => dragTaskStartHandler(e, state, task)}
                    onDragEnd={(e) => dragTaskEndHandler(e, state, task)}
                    onDrop={(e) => dropTaskHandler(e, state, task)}
                  >
                    <Task
                      task={task}
                      openTaskInfo={props.openTaskInfo}
                      setIsDone={props.setIsDone}
                    />
                  </div>
                ))}
              <div className={styles.createTask}>
                <StateNameControl
                  action={Action.createTask}
                  statusID={status._id}
                  nameControlHeader="Создать"
                  confirmButton={createTask}
                  act="Создать задачу"
                  tasks={status.tasks}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export { BoardsList };

// <div className={styles.states}>
//     {props.states && props.states.map((state) => (
//                 <div className={styles.stateBlock}
//                     key={state._id} draggable={true}
//                     onDragOver={(e) => dragStateOverHandler(e)}
//                     onDragLeave={(e) => dragStateLeaveHandler(e)}
//                     onDragStart={(e) => dragStateStartHandler(e, state)}
//                     onDragEnd={(e) => dragStateEndHandler(e)}
//                     onDrop={(e) => dropStateHandler(e, state)}
//                 >
//                     <div className={styles.stateHeader}>
//                         <div className={styles.stateNameControl} >
//                             <StateNameControl status={Status.updateStateName} stateID={state._id} stateName={state.name} confirmButton={updateStateName}
//                                 act="Изменить" />
//                         </div>
//                         <Image className={styles.deleteState} onClick={() => deleteState(state)} src={deleteIcon} alt={"delete state"} />

//                     </div>
//                     <div className={styles.tasks}>
//                         {state.tasks && state.tasks.map(task => (
//                             <div key={task._id} className={styles.task}
//                                 draggable={true}
//                                 onDragOver={(e) => dragTaskOverHandler(e)}
//                                 onDragLeave={(e) => dragTaskLeaveHandler(e)}
//                                 onDragStart={(e) => dragTaskStartHandler(e, state, task)}
//                                 onDragEnd={(e) => dragTaskEndHandler(e, state, task)}
//                                 onDrop={(e) => dropTaskHandler(e, state, task)}
//                             >
//                                 <Task task={task} openTaskInfo={props.openTaskInfo} setIsDone={props.setIsDone} />
//                             </div>
//                         ))}
//                         <div className={styles.createTask}>
//                             <StateNameControl status={Status.createTask} stateID={state._id} stateName="Создать" confirmButton={createTask}
//                                 act="Создать задачу" tasks={state.tasks} />
//                         </div>
//                     </div>
//                 </div>
//             ))}
// </div>
