import styles from "@/styles/Task.module.css";
import completeIcon from "@/public/complete.png";
import notCompleteIcon from "@/public/notComplete.png";
import fork from "@/public/fork.png";
import Image from "next/image";
import { TaskStickers } from "./TaskStickers";

const Task = (props) => {
  debugger
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
        <p className={styles.taskDoer}>{props.task.doer}</p>
        <p
          className={styles.taskHeader}
          onClick={() => props.openTaskInfo(props.task)}
        >
          {props.task.name}
        </p>
        <TaskStickers
          priority={props.task.priority}
          startDate={props.task.start_date}
          deadline={props.task.deadline}
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
                (props.task.subtasks?.filter(
                  (subtask) => subtask.is_completed === true
                )).length
              }
              /{props.task.subtasks.length}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export { Task };
