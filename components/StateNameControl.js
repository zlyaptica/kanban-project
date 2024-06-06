import { Action } from "@/utils/Enums";
import styles from "@/styles/StateNameControl.module.css";
import { useEffect, useState } from "react";

const StateNameControl = (props) => {
  const [isActiveInput, setIsActiveInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const headerTaskControl = styles.newStateButton + " " + styles.createTask;

  let headerControl =
    props.action == Action.createTask
      ? headerTaskControl
      : styles.newStateButton;

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      setIsActiveInput(false);
      setInputValue("");
      if (
        props.status == Status.updateStateName ||
        props.status == Status.updateTaskName
      ) {
        setInputValue(props.stateName);
      }
    }

    if (e.keyCode === 13) {
      confirmButton();
    }
  };

  const confirmButton = () => {
    if (inputValue) {
      props.confirmButton(inputValue);

      if (
        props.action == Action.createState ||
        props.action == Action.createTask ||
        props.action == Action.createBoard
      ) {
        setInputValue("");
      } else {
        setInputValue(props.inputValue);
      }
    }
    setIsActiveInput(false);
  };

  useEffect(() => {
    if (props.action == Action.updateStateName) setInputValue(props.inputValue);
    if (props.action == Action.updateTaskName) setInputValue(props.inputValue);
  }, [props.action, props.nameControlHeader]);

  return (
    <>
      {props.isAdmin ? (
        <div>
          {!isActiveInput ? (
            <p
              className={headerControl}
              onClick={() => setIsActiveInput(true)}
              onKeyDown={(e) => handleKeyDown(e)}
            >
              {props.nameControlHeader}
            </p>
          ) : (
            <div className={styles.inputControl}>
              <form>
                <input
                  type="text"
                  name="stateName"
                  placeholder={props.act}
                  onBlur={() => confirmButton()}
                  autoFocus
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                  required
                  onKeyDown={(e) => handleKeyDown(e)}
                />
              </form>
            </div>
          )}
        </div>
      ) : (
        <p className={headerControl}>{props.nameControlHeader}</p>
      )}
    </>
  );
};

export { StateNameControl };
