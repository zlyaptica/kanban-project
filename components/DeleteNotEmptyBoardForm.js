import { navigateToWorkplace } from "@/app/actions";
import styles from "@/styles/DeleteNotEmptyBoard.module.css";
import { useState } from "react";

const DeleteNotEmptyBoard = (props) => {
  const [deleteWay, setDeleteWay] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const deleteObject = (type) => {
    if (!props.isAdmin) return;
    type === board ? deleteBoard() : deleteStatus(deleteWay);
  };

  const deleteBoard = async () => {
    const response = await fetch(`/api/board/${props.boardID}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        author_id: props.user._id,
        empty_board: false,
      }),
    });
    const data = await response.json();
    if (response.status == 403) {
      console.log(data.message);
    } else if (response.status == 200) {
      navigateToWorkplace();
    }
  };

  const deleteStatus = async (deleteWay) => {
    const response = await fetch(`/api/board/${props.boardID}/statuses/${props.data._id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        author_id: props.user._id,
        is_save_tasks: deleteWay == 1 ? true : false, // если путь 1, то мы сохраняем задачи
      }),
    });
    const data = await response.json()
    props.setStatuses(data.boardData);
    props.setActive(false);
  };
  return (
    <div className={styles.deleteBoard}>
      {props.type == "board" ? (
        <div>
          <h2 className={styles.header}>
            Статусов на этой доске: {props.data.length}.
          </h2>
          <div className={styles.inputBlock}>
            <input
              type="checkbox"
              name="isChecked"
              checked={isChecked == "1" ? true : false}
              onChange={() => setIsChecked(!isChecked)}
            />
            Удалить доску
          </div>
        </div>
      ) : (
        <div>
          <h2 className={styles.header}>
            Задач на этом статусе: {props.data.length}.
          </h2>
          <div className={styles.inputBlock}>
            <input
              type="radio"
              name="deleteWay"
              id="1"
              checked={deleteWay == "1" ? true : false}
              onChange={(e) => setDeleteWay(e.target.id)}
            />
            Удалить доску и сохранить задачи
          </div>
          <div className={styles.inputBlock}>
            <input
              type="radio"
              name="deleteWay"
              id="2"
              checked={deleteWay == "2" ? true : false}
              onChange={(e) => setDeleteWay(e.target.id)}
            />
            Удалить доску и задачи
          </div>
        </div>
      )}

      <div className={styles.buttonBlock}>
        <button
          type="button"
          className="btn btn-sm btn-secondary m-1"
          onClick={() => props.setActive(false)}
        >
          Отмена
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger m-1"
          disabled={props.removableDataType == "board" ? !isChecked : false}
          onClick={() => deleteObject(props.removableDataType)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export { DeleteNotEmptyBoard };
