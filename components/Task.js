import styles from "@/styles/Task.module.css";
import completeIcon from "@/public/complete.png";
import notCompleteIcon from "@/public/notComplete.png";
import fork from "@/public/fork.png";
import Image from "next/image";
import { TaskStickers } from "./TaskStickers";

const Task = (props) => {
  const taskPriority = props.task.priority ? props.task.priority : null;
  const taskStartDate = props.task.start_date ? props.task.start_date : null;
  const taskDeadline = props.task.deadline ? props.task.deadline : null;

  return (
    <div className={"d-flex align-items-start"}>
      <Image
        src={props.task.is_completed ? completeIcon : notCompleteIcon}
        alt="Метка выполненной задачи"
        width={15}
        height={15}
        className="me-1"
      />
      <div>
        {props.task.doer ? (
          <p className={styles.taskDoer}>{props.task.doer.name}</p>
        ) : null}
        <p
          className={styles.taskHeader}
          onClick={() => props.openTaskInfo(props.task)}
        >
          {props.task.name}
        </p>
        <TaskStickers
          priority={taskPriority}
          startDate={taskStartDate}
          deadline={taskDeadline}
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
