"use client";

import styles from "@/styles/Canban.module.css";
import { BoardsList } from "@/components/BoardList";
import { Action } from "@/utils/Enums";
import { useEffect, useState } from "react";
import { StateNameControl } from "@/components/StateNameControl";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  const [statuses, setStatuses] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentOpenTaskSidebarData, setCurrentOpenTaskSidebarData] = useState(null);

  const canbanStyles =  isSidebarOpen ? styles.canbanAndActiveSidebar : styles.canbanAndInactiveSidebar
  const sidebarStyles = isSidebarOpen ? styles.sidebar + ' ' + styles.sidebarOpen : styles.sidebar


  const createStatus = (name) => {
    console.log("создали статус");
  };

  const openTaskInfo = (task) => {
    setCurrentOpenTaskSidebarData(task);
    setIsSidebarOpen(true);
  };

  const setIsDone = async (taskID, isCompleted) => {
    console.log("тип пометили");
  };

  useEffect(() => {
    async function getStatuses() {
      let res = await fetch("/api/statuses");
      let resJson = await res.json();
      setStatuses(resJson.statusTasks);
    }

    getStatuses();
  }, []);
  console.log(statuses);
  return (
    <div className={canbanStyles}>
      <div className={styles.boardBody}>
        <div className="row">
          <BoardsList openTaskInfo={openTaskInfo} statuses={statuses} />
        </div>
        <div className={styles.newState}>
          <StateNameControl
            action={Action.createState}
            nameControlHeader="Добавить новое состояние"
            confirmButton={createStatus}
            act="Создать"
          />
        </div>
      </div>
      <div className={sidebarStyles}>
                {isSidebarOpen
                    ?
                    <Sidebar setIsTaskSidebarOpen={setIsSidebarOpen} setStatuses={setStatuses} task={currentOpenTaskSidebarData}
                        setCurrentOpenTaskSidebarData={setCurrentOpenTaskSidebarData} setIsDone={setIsDone} />
                    :
                    null
                }
            </div>
    </div>
  );
}

// 'use client'

// import { useEffect, useState } from "react"
// import styles from "@/styles/Canban.module.css"

// export default function Home() {
//     const [states, setStates] = useState([])
//     // const [isSidebarOpen, setIsSidebarOpen] = useState(false)
//     // const [currentOpenTaskSidebarData, setCurrentOpenTaskSidebarData] = useState(null)
//     // // const [isSidebarOpen, setIsSidebarOpen] = useState(false)

//     // const [deleteNotEmptyBoardPopupActive, setDeleteNotEmptyBoardPopupActive] = useState(false)
//     // const [removableState, setRemovableState] = useState(null)

//     // const sidebarStyles = isSidebarOpen ? styles.sidebar + ' ' + styles.sidebarOpen : styles.sidebar
//     // const canbanStyles =  isSidebarOpen ? styles.canbanAndActiveSidebar : styles.canbanAndInactiveSidebar

//     // const createState = async (name) => {
//     //     const date = new Date()
//     //     const body = {
//     //         name: name,
//     //         creator: 'maxim',
//     //         created_at: date.getTime(),
//     //         index: states.length,
//     //     }
//     //     setStates(await CreateState(body))
//     // }

//     // const openTaskInfo = (task) => {
//     //     setCurrentOpenTaskSidebarData(task)
//     //     setIsSidebarOpen(true)
//     // }

//     // const setIsDone = async (taskID, isCompleted) => {
//     //     let body
//     //     if (isCompleted) {
//     //         body = {
//     //             is_completed: isCompleted,
//     //             completed_at: new Date(),
//     //         }
//     //     } else {
//     //         body = {
//     //             is_completed: isCompleted,
//     //         }
//     //     }

//     //     const request = await SetIsCompletedTask(taskID, body)
//     //     setStates(request.boardsData)
//     //     setCurrentOpenTaskSidebarData(request.updatedTask)
//     // }

//     useEffect(() => {
//         const loadTasks = async () => {
//             const data = await fetch('api/tasks').then(response => response.json())
//             setStates(data)
//         }
//         loadTasks()
//     }, [])

//     return (
//         <div>
//             {states ?? states.map((state, key) => (
//                 <div key={key}>
//                     {state.name}
//                  </div>
//             ))}
//         </div>
//         // <div className={canbanStyles}>
//         //     <div className={styles.boardBody}>
//         //         <div>
//         //             <BoardsList openTaskInfo={openTaskInfo} setIsDone={setIsDone} states={states} setStates={setStates}
//         //                 setRemovableState={setRemovableState} setDeleteNotEmptyBoardPopupActive={setDeleteNotEmptyBoardPopupActive} />
//         //         </div>
//         //         <div className={styles.newState}>
//         //             <StateNameControl status={Status.createState} stateName="Добавить новое состояние"
//         //                 confirmButton={createState} act="Создать" />
//         //         </div>
//         //     </div>
//         //     <div className={sidebarStyles}>
//         //         {isSidebarOpen
//         //             ?
//         //             <Sidebar setIsTaskSidebarOpen={setIsSidebarOpen} setStates={setStates} task={currentOpenTaskSidebarData}
//         //                 setCurrentOpenTaskSidebarData={setCurrentOpenTaskSidebarData} setIsDone={setIsDone} />
//         //             :
//         //             null
//         //         }
//         //     </div>
//         //     <Popup active={deleteNotEmptyBoardPopupActive} setActive={setDeleteNotEmptyBoardPopupActive}>
//         //         <DeleteNotEmptyBoard state={removableState} setActive={setDeleteNotEmptyBoardPopupActive} setStates={setStates} />
//         //     </Popup>
//         // </div>
//     )
// }
