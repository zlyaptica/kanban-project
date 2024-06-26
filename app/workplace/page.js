"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { StateNameControl } from "@/components/StateNameControl";
import { Action } from "@/utils/Enums";
import { navigateToHome } from "../actions";

export default function MyBoards() {
  const [user, setUser] = useState("");
  const [boards, setBoards] = useState("");

  const createBoard = async (name) => {
    let user;
    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("user"));
    }
    if (user) {
      const response = await fetch(`/api/board`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          author_id: user._id,
          name: name,
        }),
      });
      const resJson = await response.json();
      setBoards(resJson.boards);
    }
  };

  useEffect(() => {
    const getUserBoards = async (user_id) => {
      const response = await fetch(`/api/users/${user_id}/boards`);
      const data = await response.json();
      if (data.boards) setBoards(data.boards);
    };
    
    let user;
    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("user"));
      if (user) setUser(user);
    }

    if (!user) {
      navigateToHome();
      return
    }
    getUserBoards(user._id);

  }, []);
  return (
    <div className={"m-2"}>
      <StateNameControl
        action={Action.createState}
        nameControlHeader="Создать новую доску"
        act="Создать новую доску"
        confirmButton={createBoard}
      />
      <div className={"p-2"}>
        <h5 className={"m-0"}>Ваши доски:</h5>
        {boards &&
          boards.map((board) => (
            <div key={board._id} className="d-flex align-items-center">
              <Link
                className="btn btn-link p-0 text-decoration-none"
                href={`/workplace/board/${board._id}`}
              >
                {board.name}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
