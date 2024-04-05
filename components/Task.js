import styles from '@/styles/Task.module.css'

const Task = (props) => {
    const setDoneClass = props.task.is_completed ? styles.setDone + ' ' + styles.done : styles.setDone
    return (
        <div className={styles.task}>
            {/* <button className={setDoneClass} onClick={() => props.setIsDone(props.task._id, !props.task.is_completed)}>✔</button>  */}
            <button className={setDoneClass}>✔</button> 
            <p onClick={() => props.openTaskInfo(props.task)}>{props.task.name}</p>
        </div>
    )
}

export { Task }