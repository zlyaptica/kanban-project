import { useState } from "react";
import styles from "@/styles/StatusMenu.module.css";

const StatusMenu = (props) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenSelectTypeStatus, setIsOpenSelectTypeStatus] = useState(false);

  const disableMenu = () => {
    setIsOpenMenu(!isOpenMenu);
    setIsOpenSelectTypeStatus(false);
  };

  return (
    <div className={"dropdown align-middle"}>
      <button
        className="btn"
        type="button"
        onClick={() => disableMenu()}
      >
        ...
      </button>
      {isOpenMenu ? (
        <div className={styles.dropdownMenu}>
          <button className={styles.dropdownItem} type="button">
            Action
          </button>
          <p
            className={styles.dropdownItem}
            onClick={() => setIsOpenSelectTypeStatus(!isOpenSelectTypeStatus)}
          >
            Выбрать тип&nbsp;
            <i className="dropdown-toggle"></i>
          </p>
          {isOpenSelectTypeStatus ? (
            <select
              className={styles.selectTypeStatus}
              size="3"
              value={props.status.type}
            >
              <option id="TODO" className={styles.option}>
                TODO
              </option>
              <option id="DOING" className={styles.option}>
                DOING
              </option>
              <option id="DONE" className={styles.option}>
                DONE
              </option>
            </select>
          ) : null}
          <button
            className={styles.dropdownItem + " " + styles.deleteStatus}
            type="button"
            onClick={props.deleteStatus}
          >
            Удалить
          </button>
        </div>
      ) : null}
    </div>
  );
};

export { StatusMenu };
