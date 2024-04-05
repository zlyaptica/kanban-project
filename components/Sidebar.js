import Image from "next/image";
import styles from "@/styles/Sidebar.module.css";
import { useEffect, useState } from "react";
import { Action } from "@/utils/Enums";
import deleteIcon from "../public/deleteIcon.svg";
import { StateNameControl } from "./StateNameControl";

const Sidebar = (props) => {
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const setDoneClass = props.task.is_completed
    ? styles.setDone + " " + styles.done
    : styles.setDone;

  const updateTaskName = (taskID, name) => {
    console.log("update");
  };

  const deleteTask = (taskID) => {
    console.log("delete task");
  };

  const updateTaskDeadline = (taskID, e) => {

  }

  const updatePriority = (taskID, priority) => {

  }

  const updateTaskDescription = (taskID) => {

  }

  useEffect(() => {
    setDescription(props.task.description);

    if (props.task.deadline) {
      const taskDeadline = new Date(props.task.deadline);
      setDeadline(taskDeadline.toISOString().split("T")[0]);
    } else {
      setDeadline("");
    }
  }, [props.task.description, props.task.deadline]);
  return (
    <div className={styles.sidebar}>
      <div className={styles.information}>
        <div className={styles.control}>
          <button
            className={styles.closeSidebar}
            onClick={() => props.setIsTaskSidebarOpen(false)}
          >
            X
          </button>
          <button
            className={setDoneClass}
            onClick={() =>
              props.setIsDone(props.task._id, !props.task.is_completed)
            }
          >
            ✔ Выполнено
          </button>
          <Image
            src={deleteIcon}
            alt="Удалить задачу"
            className={styles.deleteTaskButton}
            onClick={() => deleteTask(props.task._id)}
          />
        </div>
        <div className={styles.stateNameControl}>
          <StateNameControl
            action={Action.updateTaskName}
            statusID={props.task._id}
            nameControlHeader={props.task.name}
            confirmButton={updateTaskName}
            act="Изменить"
          />
        </div>
        <div className={styles.formRow}>
          <span>Срок выполнения</span>
          <input
            className={styles.input}
            type="date"
            name="deadline"
            value={deadline}
            onChange={(e) => updateTaskDeadline(props.task._id, e)}
          />
        </div>
        <div className={styles.formRow}>
          <span>Приоритет</span>
          <select
            className={styles.input}
            name="priority"
            value={props.task.priority}
            onChange={(e) => updatePriority(props.task._id, e)}
          >
            <option id="0" value="——">
              ——
            </option>
            <option id="1" value="Низкий">
              Низкий
            </option>
            <option id="2" value="Средний">
              Средний
            </option>
            <option id="3" value="Высокий">
              Высокий
            </option>
          </select>
        </div>
        <div className={styles.formRow}>
          <span>Описание</span>
          <textarea
            name=""
            cols="40"
            rows="10"
            className={styles.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => updateTaskDescription(props.task._id)}
          ></textarea>
        </div>
      </div>
      <div className={styles.taskHostory}>каменты будут</div>
    </div>
  );
};

export { Sidebar };
