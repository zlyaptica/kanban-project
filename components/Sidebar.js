import Image from "next/image";
import styles from "@/styles/Sidebar.module.css";
import { useEffect, useState } from "react";
import { Action } from "@/utils/Enums";
import deleteIcon from "../public/deleteIcon.svg";
import galochka from "../public/galochka.svg";
import { StateNameControl } from "./StateNameControl";
import { Subtask } from "./Subtask";

const Sidebar = (props) => {
  const [user, setUser] = useState("");
  const [taskMailDoer, setTaskMailDoer] = useState("");
  const [isTaskMailDoerInputActive, setIsTaskMailDoerInputActive] =
    useState(false);

  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [startDate, setStartDate] = useState("");

  const [isStartDateChosen, setIsStartDateChosen] = useState(false);

  const [createSubtaskInputActive, setCreateSubtaskInputActive] =
    useState(false);
  const [createSubtaskInputValue, setCreateSubtaskInputValue] = useState("");

  const setDoneClass = props.task.is_completed
    ? styles.setDoneButton + " " + "btn btn-success"
    : styles.setDoneButton + " " + "btn btn-outline-success";

  const setIsDone = async (task_id, is_completed) => {
    if (user) {
      const response = await fetch(`/api/tasks/${task_id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          author_id: user._id,
          is_completed: is_completed,
          field: "is_completed",
        }),
      });
      const data = await response.json();
      if (response.status == 403) {
        console.log(data.message);
      } else if (response.status == 200) {
        props.setStatuses(data.boardData);
        props.setTask(data.updatedTask);
      }
    }
  };

  const updateTaskName = async (name) => {
    if (user) {
      const response = await fetch(`/api/tasks/${props.task._id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          author_id: user._id,
          name: name,
          field: "name",
        }),
      });
      const data = await response.json();
      if (response.status == 403) {
        console.log(data.message);
      } else if (response.status == 200) {
        props.setStatuses(data.boardData);
        props.setTask(data.updatedTask);
      }
    }
  };

  const deleteTask = async () => {
    if (user) {
      const response = await fetch(`/api/tasks/${props.task._id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          author_id: user._id,
        }),
      });
      const data = await response.json();
      if (response.status == 403) {
        console.log(data.message);
      } else if (response.status == 200) {
        props.setStatuses(data.boardData);
        props.setIsSidebarOpen(false)
      }
    }
  };

  const chooseDoer = async () => {
    if (user) {
      let doer;
      if (props.task.doer) {
        doer = props.task.doer.email;
      }
      if (taskMailDoer !== doer) {
        const response = await fetch(`/api/tasks/${props.task._id}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            author_id: user._id,
            doerEmail: taskMailDoer,
            field: "doer",
            type: "set",
          }),
        });
        const data = await response.json();
        console.log(data);
        if (response.status == 403) {
          console.log(data.message);
        } else if (response.status == 200) {
          setTaskMailDoer(taskMailDoer);
          props.setStatuses(data.boardData);
          props.setTask(data.updatedTask);
        }
      }
      setIsTaskMailDoerInputActive(false);
    }
  };

  const clearDoer = async () => {
    if (taskMailDoer) {
      if (user) {
        const response = await fetch(`/api/tasks/${props.task._id}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            author_id: user._id,
            doerEmail: taskMailDoer,
            field: "doer",
            type: "unset",
          }),
        });
        const data = await response.json();
        if (response.status == 403) {
          console.log(data.message);
        } else if (response.status == 200) {
          props.setStatuses(data.boardData);
          props.setTask(data.updatedTask);
          setTaskMailDoer("");
        } else {
          console.log("errorrr");
        }
      }
    } else {
      setTaskMailDoer("");
      setIsTaskMailDoerInputActive(false);
    }
  };

  const updateTaskStartDate = async (startDate) => {
    if (user) {
      const response = await fetch(`/api/tasks/${props.task._id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          author_id: user._id,
          startDate: startDate != "" ? new Date(startDate) : "",
          field: "startDate",
        }),
      });
      const data = await response.json();
      if (response.status == 403) {
        console.log(data.message);
      } else if (response.status == 200) {
        props.setStatuses(data.boardData);
        props.setTask(data.updatedTask);
      } else if (response.status == 400) {
        console.log(data.message);
      }
    }
  };

  const deleteStartDate = async () => {
    if (startDate) {
      if (user) {
        const response = await fetch(`/api/tasks/${props.task._id}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            author_id: user._id,
            startDate: "",
            field: "startDate",
          }),
        });
        const data = await response.json();
        if (response.status == 403) {
          console.log(data.message);
        } else if (response.status == 200) {
          props.setStatuses(data.boardData);
          props.setTask(data.updatedTask);
        } else if (response.status == 400) {
          console.log(data.message);
        }
      }
    } else {
      setIsStartDateChosen(false);
    }
  };

  const updateTaskDeadline = async (deadline) => {
    if (user) {
      const response = await fetch(`/api/tasks/${props.task._id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          author_id: user._id,
          deadLineDate: deadline != "" ? new Date(deadline) : "",
          field: "deadLineDate",
        }),
      });
      const data = await response.json();
      if (response.status == 403) {
        console.log(data.message);
      } else if (response.status == 200) {
        props.setStatuses(data.boardData);
        props.setTask(data.updatedTask);
      } else if (response.status == 400) {
        console.log(data.message);
      }
    }
  };

  const updatePriority = async (priority) => {
    if (user) {
      const response = await fetch(`/api/tasks/${props.task._id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          author_id: user._id,
          priority: priority,
          field: "priority",
        }),
      });
      const data = await response.json();
      if (response.status == 403) {
        console.log(data.message);
      } else if (response.status == 200) {
        props.setStatuses(data.boardData);
        props.setTask(data.updatedTask);
      }
    }
  };

  const updateTaskDescription = async () => {
    if (user) {
      const response = await fetch(`/api/tasks/${props.task._id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          author_id: user._id,
          description: description,
          field: "description",
        }),
      });
      const data = await response.json();
      if (response.status == 403) {
        console.log(data.message);
      } else if (response.status == 200) {
        props.setStatuses(data.boardData);
        props.setTask(data.updatedTask);
      }
    }
  };

  const createSubtask = async (user, taskID, taskName) => {
    if (user) {
      const response = await fetch(`/api/subtasks`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          author_id: user._id,
          task_id: taskID,
          name: taskName,
        }),
      });
      const data = await response.json();
      if (response.status == 403) {
        console.log(data.message);
      } else if (response.status == 201) {
        props.setStatuses(data.boardData);
        props.setTask(data.updatedTask);
        setCreateSubtaskInputValue("");
        setCreateSubtaskInputActive(false);
      }
    }
  };

  const checkSubtask = async (subtask_id, done) => {
    if (user) {
      const response = await fetch(`/api/subtasks/${subtask_id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          author_id: user._id,
          task_id: props.task._id,
          done: done,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.status == 403) {
        console.log(data.message);
      } else if (response.status == 200) {
        props.setStatuses(data.boardData);
        props.setTask(data.updatedTask);
      }
    }
  };

  const cancelCreateSubtask = () => {
    setCreateSubtaskInputActive(false);
    setCreateSubtaskInputValue("");
  };

  const deleteSubtask = async (subtask_id) => {
    if (user) {
      const response = await fetch(`/api/subtasks/${subtask_id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          author_id: user._id,
          task_id: props.task._id,
        }),
      });
      const data = await response.json();
      if (response.status == 403) {
        console.log(data.message);
      } else if (response.status == 200) {
        props.setStatuses(data.boardData);
        props.setTask(data.updatedTask);
      }
    }
  };

  useEffect(() => {
    if (props.user) setUser(props.user);

    setDescription(props.task.description);
    if (props.task.deadLineDate) {
      const taskDeadline = new Date(props.task.deadLineDate);
      setDeadline(taskDeadline.toISOString().split("T")[0]);
    } else {
      setDeadline("");
    }

    if (props.task.startDate) {
      const taskStartDate = new Date(props.task.startDate);
      setStartDate(taskStartDate.toISOString().split("T")[0]);
    } else {
      setStartDate("");
    }

    if (props.task.doer) {
      setTaskMailDoer(props.task.doer.email);
    } else {
      setTaskMailDoer("");
    }
  }, [props.task, props.user]);
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
                setIsDone(props.task._id, !props.task.is_completed)
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
              onClick={() => deleteTask(props.task._id)}
            />
          </div>
        </div>
        <div className={styles.stateNameControl}>
          <StateNameControl
            action={Action.updateTaskName}
            inputValue={props.task.name}
            nameControlHeader={props.task.name}
            confirmButton={updateTaskName}
            act="Изменить"
          />
        </div>
        <div>
          {props.task.doer && !isTaskMailDoerInputActive ? (
            <div>
              <h6 className={"m-0 me-1"}>Исполнитель</h6>
              <p onClick={() => setIsTaskMailDoerInputActive(true)}>
                {props.task.doer.name}
              </p>
            </div>
          ) : null}
          {!props.task.doer && !isTaskMailDoerInputActive ? (
            <button
              className="btn btn-link text-decoration-none"
              onClick={() => setIsTaskMailDoerInputActive(true)}
            >
              Добавить исполнителя
            </button>
          ) : null}
          {isTaskMailDoerInputActive ? (
            <div className={"d-flex flex-column "}>
              <input
                type="email"
                name="taskMailDoer"
                value={taskMailDoer}
                autoFocus
                onChange={(e) => setTaskMailDoer(e.target.value)}
              />
              <div className="">
                <button
                  className="btn btn-link text-decoration-none"
                  onClick={() => chooseDoer()}
                >
                  Сохранить
                </button>
                {props.task.doer ? (
                  <button
                    className="btn btn-link text-decoration-none"
                    onClick={() => clearDoer()}
                  >
                    Удалить
                  </button>
                ) : (
                  <button
                    className="btn btn-link text-decoration-none"
                    onClick={() => clearDoer()}
                  >
                    Отмена
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
        <div className={"d-flex flex-row"}>
          {isStartDateChosen || startDate ? (
            <div className="d-flex flex-column me-3">
              <div className="d-flex align-items-center">
                <h6 className={"m-0 me-1"}>Дата начала</h6>
                <button
                  className={
                    styles.deleteStartDateButton + " " + "btn-close me-2"
                  }
                  onClick={() => deleteStartDate()}
                ></button>
              </div>
              <input
                className={styles.input}
                type="date"
                name="startdate"
                value={startDate}
                onChange={(e) => updateTaskStartDate(e.target.value)}
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
              onChange={(e) => updateTaskDeadline(e.target.value)}
            />
          </div>
          {!isStartDateChosen & !startDate ? (
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
            onChange={(e) => updatePriority(e.target.value)}
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
            onBlur={() => updateTaskDescription()}
          ></textarea>
        </div>
        <div className="d-flex flex-column">
          <h6 className={"font-weight-bold m-0 mb-1"}>Подзадачи</h6>
          <div className={styles.createSubtask}>
            {createSubtaskInputActive ? (
              <div className={"d-flex flex-column"}>
                <input
                  type="text"
                  autoFocus
                  placeholder="Введите название..."
                  value={createSubtaskInputValue}
                  onChange={(e) => setCreateSubtaskInputValue(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    className="btn"
                    type="button"
                    onClick={() =>
                      createSubtask(
                        user,
                        props.task._id,
                        createSubtaskInputValue
                      )
                    }
                  >
                    Создать
                  </button>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => cancelCreateSubtask()}
                  >
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
          {props.task.subtasks &&
            props.task.subtasks.map((subtask, key) => (
              <div key={key}>
                <Subtask
                  subtask={subtask}
                  deleteSubtask={deleteSubtask}
                  checkSubtask={checkSubtask}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export { Sidebar };
