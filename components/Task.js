import styles from "@/styles/Task.module.css";
import completeIcon from "@/public/complete.png";
import notCompleteIcon from "@/public/notComplete.png";
import fork from "@/public/fork.png";
import Image from "next/image";
import { TaskStickers } from "./TaskStickers";

const Task = (props) => {
  const task = props.task.task
  return (
    <div className={"d-flex align-items-start"}>
      {/* <button className={setDoneClass} onClick={() => props.setIsDone(props.task._id, !props.task.is_completed)}>✔</button>  */}
      <Image
        src={props.task.is_completed ? completeIcon : notCompleteIcon}
        alt="Метка выполненной задачи"
        width={15}
        height={15}
        className="me-1"
      />
      <div>
        <p className={styles.taskDoer}>{props.task.doerData.name}</p>
        <p
          className={styles.taskHeader}
          onClick={() => props.openTaskInfo(task)}
        >
          {props.task.task.name}
        </p>
        <TaskStickers
          priority={task.priority}
          startDate={task.start_date}
          deadline={task.deadline}
        />
        {props.task.subtasks ? (
          <div className={"d-flex flex-row align-items-center"}>
            <Image
              src={fork}
              alt="Метка выполненной задачи"
              width={15}
              height={15}
              className="me-1"
            />
            <p className={styles.subtaskHeader}>
              {
                (task.subtasks?.filter(
                  (subtask) => subtask.is_completed === true
                )).length
              }
              /{task.subtasks.length}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export { Task };
