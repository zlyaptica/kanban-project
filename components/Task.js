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

  const setIsDone = async (task_id) => {
    let user;
    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("user"));
    }

    if (user) {
      const response = await fetch(`/api/tasks/${task_id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          author_id: user._id,
          is_completed: !props.task.is_completed,
          field: "is_completed",
        }),
      });
      const data = await response.json();
      if (response.status == 403) {
        console.log(data.message);
      } else if (response.status == 200) {
        props.setStatuses(data.boardData);
        props.setCurrentOpenTaskSidebarData(data.updatedTask);
      }
    }
  };

  return (
    <div className={"d-flex align-items-start"}>
      <Image
        src={props.task.is_completed ? completeIcon : notCompleteIcon}
        alt="Метка выполненной задачи"
        width={15}
        height={15}
        className="me-1"
        onClick={() => setIsDone(props.task._id)}
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
