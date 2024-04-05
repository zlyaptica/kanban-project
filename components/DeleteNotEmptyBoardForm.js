// import { DeleteState } from '@/app/api/api'
// import styles from '@/styles/DeleteNotEmptyBoard.module.css'
// import { useEffect, useState } from 'react'

// const DeleteNotEmptyBoard = (props) => {
//     const [taskCount, setTaskCount] = useState(0)
//     const [deleteWay, setDeleteWay] = useState(1)

//     const deleteBoard = async (deleteWay) => {
//         const body = {
//             is_save_tasks: deleteWay == 1 ? true : false // если путь 1, то мы сохраняем задачи
//         }
//         props.setStates(await DeleteState(props.state._id, body))
//         props.setActive(false)
//     }

//     useEffect(() => {
//         if (props.state) setTaskCount(props.state.tasks.length)
//     }, [props.state])
//     return (
//         <div className={styles.deleteBoard}>
//             <h2 className={styles.header}>Эта доска содержит {taskCount}</h2>
//             <div className={styles.inputBlock}>
//                 <input type="radio" name="deleteWay" id="1" 
//                     checked={deleteWay == '1' ? true : false} onChange={(e) => setDeleteWay(e.target.id)}
//                 /> Удалить доску и сохраниь задачи
//             </div>
//             <div className={styles.inputBlock}>
//                 <input type="radio" name="deleteWay" id="2" 
//                     checked={deleteWay == '2' ? true : false} onChange={(e) => setDeleteWay(e.target.id)}
//                 /> Удалить доску и задачи
//             </div>
//             <div className={styles.buttonBlock}>
//             <button className={styles.button} onClick={() => props.setActive(false)}>Отмена</button>
//             <button className={styles.button + ' ' + styles.buttonDelete} onClick={() => deleteBoard(deleteWay)}>Удалить</button>
//             </div>
//         </div>
//     )
// }

// export { DeleteNotEmptyBoard }