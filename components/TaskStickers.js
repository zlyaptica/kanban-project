import styles from "@/styles/TaskStickers.module.css";
import { TaskAttributes } from "@/utils/Enums";
import Image from "next/image";
import priorityIcon from "@/public/priority.svg";
import alarm from "@/public/alarm.svg";

const TaskStickers = ({ priority, startDate, deadline }) => {
  return (
    <div className="d-flex flex-wrap">
      <div className="me-1">
        {priority ? (
          <div className={"d-inline-block"}>
            <div className="d-flex align-items-center badge text-bg-primary text-wrap">
              <Image
                className="me-1"
                src={priorityIcon}
                alt="Метка выполненной задачи"
                width={10}
                height={10}
              />
              <p className={styles.attributeName}>{TaskAttributes[priority]}</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="me-1">
        {deadline ? (
          <div className={"d-inline-block"}>
            <div className="d-flex align-items-center badge text-bg-info text-wrap">
              <Image
                className="me-1"
                src={alarm}
                alt="Метка выполненной задачи"
                width={10}
                height={10}
              />
              {startDate ? (
                <p className={styles.attributeName}>
                  {startDate} - {deadline}
                </p>
              ) : (
                <p className={styles.attributeName}>{deadline}</p>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export { TaskStickers };
