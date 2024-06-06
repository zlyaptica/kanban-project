import Image from "next/image";
import styles from "@/styles/Sidebar.module.css";
import { useEffect, useState } from "react";
import { Action } from "@/utils/Enums";
import deleteIcon from "../public/deleteIcon.svg";
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
    if (!props.isAdmin) return;

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
  };

  const updateTaskName = async (name) => {
    if (!props.isAdmin) return;

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
  };

  const deleteTask = async () => {
    if (!props.isAdmin) return;

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
      props.setIsSidebarOpen(false);
    }
  };

  const chooseDoer = async () => {
    if (!props.isAdmin) return;

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
  };

  const clearDoer = async () => {
    if (!props.isAdmin) return;

    if (taskMailDoer) {
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
    } else {
      setTaskMailDoer("");
      setIsTaskMailDoerInputActive(false);
    }
  };

  const updateTaskStartDate = async (startDate) => {
    if (!props.isAdmin) return;
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
  };

  const deleteStartDate = async () => {
    if (!props.isAdmin) return;

    if (startDate) {
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
    } else {
      setIsStartDateChosen(false);
    }
  };

  const updateTaskDeadline = async (deadline) => {
    if (!props.isAdmin) return;

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
  };

  const updatePriority = async (priority) => {
   if (!props.isAdmin) return;
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
  };

  const updateTaskDescription = async () => {
    if (!props.isAdmin) return;

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
  };

  const createSubtask = async (user, taskID, taskName) => {
    if (!props.isAdmin) return;
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
  };

  const checkSubtask = async (subtask_id, done) => {
    if (!props.isAdmin) return;
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
  };

  const cancelCreateSubtask = () => {
    setCreateSubtaskInputActive(false);
    setCreateSubtaskInputValue("");
  };

  const deleteSubtask = async (subtask_id) => {
    if (!props.isAdmin) return;

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
  };

  const handleKeyDown = (e, field) => {
    // если нажат эскейп, то отмена
    if (e.keyCode === 27) {
      if (field === "subtask") {
        cancelCreateSubtask();
      }
      if (field === "doer") {
        clearDoer();
      }
    }

    // если нажат энтер, то успех
    if (e.keyCode === 13) {
      if (field === "subtask") {
        createSubtask(user, props.task._id, createSubtaskInputValue);
      }
      if (field === "doer") {
        chooseDoer();
      }
    }
  };

  useEffect(() => {
    if (props.user) setUser(props.user);
  }, [props.user])

  useEffect(() => {
    if (props.task.description) {
      setDescription(props.task.description);
    } else {
      setDescription("");
    }
  }, [props.task.description])

  useEffect(() => {
    if (props.task.deadLineDate) {
      setDeadline(props.task.deadLineDate);
    } else {
      setDeadline("");
    }
  }, [props.task.deadLineDate])

  useEffect(() => {
    if (props.task.startDate) {
      setStartDate(props.task.startDate);
    } else {
      setStartDate("");
    }
  }, [props.task.startDate])

  useEffect(() => {
    if (props.task.doer) {
      setTaskMailDoer(props.task.doer.email);
    } else {
      setTaskMailDoer("");
    }
  }, [props.task.doer]);

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
            {props.isAdmin ? (
              <button
                className={setDoneClass}
                onClick={() =>
                  setIsDone(props.task._id, !props.task.is_completed)
                }
              >
                Выполнено
              </button>
            ) : (
              <button className={setDoneClass}>Выполнено</button>
            )}
          </div>
          {props.isAdmin ? (
            <div className={"cursor-pointer ml-auto p-2"}>
              <Image
                src={deleteIcon}
                height={20}
                width={20}
                alt="Удалить задачу"
                onClick={() => deleteTask(props.task._id)}
              />
            </div>
          ) : null}
        </div>
        <div className={styles.stateNameControl}>
          <StateNameControl
            isAdmin={props.isAdmin}
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
              {props.isAdmin ? (
                <div>
                  <h6 className={"m-0 me-1"}>Исполнитель</h6>
                  <p onClick={() => setIsTaskMailDoerInputActive(true)}>
                    {props.task.doer.name}
                  </p>
                </div>
              ) : (
                <div>
                  <h6 className={"m-0 me-1"}>Исполнитель</h6>
                  <p>{props.task.doer.name}</p>
                </div>
              )}
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
                onKeyDown={(e) => handleKeyDown(e, "doer")}
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
                {props.isAdmin ? (
                  <button
                    className={
                      styles.deleteStartDateButton + " " + "btn-close me-2"
                    }
                    onClick={() => deleteStartDate()}
                  ></button>
                ) : null}
              </div>
              {props.isAdmin ? (
                <input
                  className={styles.input}
                  type="date"
                  name="startdate"
                  value={startDate}
                  onChange={(e) => updateTaskStartDate(e.target.value)}
                />
              ) : null}
            </div>
          ) : null}
          <div className="d-flex flex-column">
            <h6 className={"m-0"}>Дата окончания</h6>
            {props.isAdmin ? (
              <input
                className={styles.input}
                type="date"
                name="deadline"
                value={deadline}
                onChange={(e) => updateTaskDeadline(e.target.value)}
              />
            ) : (
              <p>{deadline}</p>
            )}
          </div>
          {!isStartDateChosen & !startDate ? (
            <div>
              {props.isAdmin ? (
                <button
                  className="btn btn-link text-decoration-none"
                  onClick={() => setIsStartDateChosen(true)}
                >
                  Добавить дату начала
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className={"d-flex flex-column"}>
          <h6 className={"font-weight-bold m-0"}>Приоритет</h6>
          {props.isAdmin ? (
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
          ) : (
            <p>{props.task.priority}</p>
          )}
        </div>
        <div className={"d-flex flex-column mb-3"}>
          <h6 className={"font-weight-bold m-0"}>Описание</h6>
          {props.isAdmin ? (
            <textarea
              name=""
              cols="40"
              rows="10"
              className={styles.description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => updateTaskDescription()}
            ></textarea>
          ) : (
            <textarea
              name=""
              cols="40"
              rows="10"
              className={styles.description}
              value={description}
              readOnly={true}
            ></textarea>
          )}
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
                  onKeyDown={(e) => handleKeyDown(e, "subtask")}
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
              <div>
                {props.isAdmin ? (
                  <button
                    className={"btn btn-link p-0 text-decoration-none"}
                    onClick={() => setCreateSubtaskInputActive(true)}
                  >
                    Создать подзадачу
                  </button>
                ) : null}
              </div>
            )}
          </div>
          {props.task.subtasks &&
            props.task.subtasks.map((subtask, key) => (
              <div key={key}>
                <Subtask
                  isAdmin={props.isAdmin}
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
