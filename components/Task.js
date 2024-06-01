import styles from "@/styles/Task.module.css";
import completeIcon from "@/public/complete.png";
import notCompleteIcon from "@/public/notComplete.png";
import fork from "@/public/fork.png";
import Image from "next/image";
import { TaskStickers } from "./TaskStickers";

const Task = (props) => {
  let taskPriority = props.task.priority ? props.task.priority : null;
  let taskStartDate = props.task.startDate ? props.task.startDate : null;
  let taskDeadLine = props.task.deadLineDate ? props.task.deadLineDate : null;

  const setIsDone = async (task_id) => {
    if (!props.isAdmin) return
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
      <div onClick={() => props.openTaskInfo(props.task)}>
        {props.task.doer ? (
          <p className={styles.taskDoer}>{props.task.doer.name}</p>
        ) : null}
        <p className={styles.taskHeader}>
          {props.task.name}
        </p>
        <TaskStickers
          priority={taskPriority}
          startDate={taskStartDate}
          deadline={taskDeadLine}
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
                  (subtask) => subtask.done === true
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
