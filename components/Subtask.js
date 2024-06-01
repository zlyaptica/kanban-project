import { useEffect, useState } from "react";
import deleteIcon from "../public/deleteIcon.svg";
import Image from "next/image";

const Subtask = (props) => {
  const [checked, setChecked] = useState(false);
  const checkSubtask = () => {
    props.checkSubtask(props.subtask._id, !checked)
  }

  useEffect(() => {
    setChecked(props.subtask.done)
  }, [props.subtask])
  
  return (
    <div className={"d-flex align-items-center"}>
      <div className={"p-1"}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => checkSubtask()}
        />
      </div>
      <p className={"m-0"}>{props.subtask.name}</p>
      <Image
        src={deleteIcon}
        height={15}
        width={15}
        alt="Удалить задачу"
        className={"pe-auto ms-auto"}
        onClick={() => props.deleteSubtask(props.subtask._id)}
      />
    </div>
  );
};

export { Subtask };
