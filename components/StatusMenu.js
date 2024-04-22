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
    <div className={"dropdown align-middle"} onBlur={() => disableMenu()}>
      <button
        className="btn"
        type="button"
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        ...
      </button>
      {isOpenMenu ? (
        <div>
          <div className={styles.dropdownMenu}>
            <div>
              <button className={styles.dropdownItem} type="button">
                Action
              </button>
            </div>
            <div>
              <p
                className={styles.dropdownItem}
                onMouseEnter={() => setIsOpenSelectTypeStatus(true)}
              >
                Выбрать тип &gt;
              </p>
              {isOpenSelectTypeStatus ? (
                <div onMouseLeave={() => setIsOpenSelectTypeStatus(false)}>
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
                </div>
              ) : null}
            </div>
            <div>
              <button
                className={styles.dropdownItem + " " + styles.deleteStatus}
                type="button"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { StatusMenu };
