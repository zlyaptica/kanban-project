import Image from "next/image";
import styles from "@/styles/Sidebar.module.css";
import { useEffect, useState } from "react";
import { Action } from "@/utils/Enums";
import deleteIcon from "../public/deleteIcon.svg";
import { StateNameControl } from "./StateNameControl";
import { Subtask } from "./Subtask";

const Sidebar = (props) => {
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isStartDateChosen, setIsStartDateChosen] = useState(false);

  const [createSubtaskInputActive, setCreateSubtaskInputActive] =
    useState(false);
  const [createSubtaskInputValue, setCreateSubtaskInputValue] = useState("");

  const setDoneClass = props.task.is_completed
    ? styles.setDoneButton + " " + "btn btn-success"
    : styles.setDoneButton + " " + "btn btn-outline-success";

  const updateTaskName = (taskID, name) => {
    console.log("update");
  };

  const deleteTask = (taskID) => {
    console.log("delete task");
  };

  const updateTaskDeadline = (taskID, e) => {};

  const updatePriority = (taskID, priority) => {};

  const updateTaskDescription = (taskID) => {};

  const cancelCreateSubtask = () => {
    setCreateSubtaskInputActive(false)
    setCreateSubtaskInputValue("")
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
      <div className={"mt-3"}>
        <div className={"d-flex align-items-center"}>
          <div className="p-2">
            <button
              className={"btn-close me-2"}
              onClick={() => props.setIsSidebarOpen(false)}
            ></button>
          </div>
          <div className="p-2">
            <button
              className={setDoneClass}
              onClick={() =>
                props.setIsDone(props.task._id, !props.task.is_completed)
              }
            >
              Выполнено
            </button>
          </div>
          <div className={"cursor-pointer ml-auto p-2"}>
            <Image
              src={deleteIcon}
              height={20}
              width={20}
              alt="Удалить задачу"
              className={"cursor-pointer ml-auto p-2"}
              onClick={() => deleteTask(props.task._id)}
            />
          </div>
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
        <div className={"d-flex flex-row"}>
          {isStartDateChosen ? (
            <div className="d-flex flex-column me-3">
              <div className="d-flex align-items-center">
                <h6 className={"m-0 me-1"}>Дата начала</h6>
                <button
                  className={
                    styles.deleteStartDateButton + " " + "btn-close me-2"
                  }
                  onClick={() => setIsStartDateChosen(false)}
                ></button>
              </div>
              <input
                className={styles.input}
                type="date"
                name="deadline"
                value={deadline}
                onChange={(e) => updateTaskDeadline(props.task._id, e)}
              />
            </div>
          ) : null}
          <div className="d-flex flex-column">
            <h6 className={"m-0"}>Дата окончания</h6>
            <input
              className={styles.input}
              type="date"
              name="deadline"
              value={deadline}
              onChange={(e) => updateTaskDeadline(props.task._id, e)}
            />
          </div>
          {!isStartDateChosen ? (
            <button
              className="btn btn-link text-decoration-none"
              onClick={() => setIsStartDateChosen(true)}
            >
              Добавить дату начала
            </button>
          ) : null}
        </div>
        <div className={"d-flex flex-column"}>
          <h6 className={"font-weight-bold m-0"}>Приоритет</h6>
          <select
            className={styles.input}
            name="priority"
            value={props.task.priority}
            onChange={(e) => updatePriority(props.task._id, e)}
          >
            <option id="0" value="0">
              ——
            </option>
            <option id="1" value="1">
              Низкий
            </option>
            <option id="2" value="2">
              Средний
            </option>
            <option id="3" value="3">
              Высокий
            </option>
          </select>
        </div>
        <div className={"d-flex flex-column mb-3"}>
          <h6 className={"font-weight-bold m-0"}>Описание</h6>
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
        <div className="d-flex flex-column">
          <h6 className={"font-weight-bold m-0 mb-1"}>Подзадачи</h6>
          <div className={styles.createSubtask}>
            {createSubtaskInputActive ? (
              <div className={"d-flex align-items-center"}>
                <input
                  type="text"
                  className={styles.subtaskInput}
                  placeholder="Введите название..."
                  value={createSubtaskInputValue}
                  onChange={(e) => setCreateSubtaskInputValue(e.target.value)}
                />
                <div className="input-group-append">
                  <button className="btn" type="button">
                    Создать
                  </button>
                  <button className="btn" type="button" onClick={() => cancelCreateSubtask()}>
                    Отменить
                  </button>
                </div>
              </div>
            ) : (
              <button
                className={"btn btn-link p-0 text-decoration-none"}
                onClick={() => setCreateSubtaskInputActive(true)}
              >
                Создать подзадачу
              </button>
            )}
          </div>
          {props.task.subtasks && props.task.subtasks.map((subtask, key) => (
            <div key={key}>
              <Subtask subtask={subtask}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Sidebar };
