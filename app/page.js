"use client";

import { Popup } from "@/components/Popup";
import { SignIn } from "@/components/SignIn";
import { SignUp } from "@/components/SignUp";
import Link from "next/link";
import { redirect } from 'next/navigation'
import { useEffect, useState } from "react";
import UseLocalStorage from "./hooks/UseLocalStorage";

export default function Home  () {
  const id = "663a59e96623dac88b959d27";

  const [isAuthenticatedUser, setIsAuthenticatedUser] = UseLocalStorage(
    "isAuthenticatedUser",
    ""
  );
  const [user, setUserData] = UseLocalStorage("user", "");
  if (isAuthenticatedUser) {
    redirect(`/workplace/board/${id}`);
  }

  const [SignInPopupActive, setSignInPopupActive] = useState(false);
  const [SignUpPopupActive, setPopupSignUpActive] = useState(false);

  return (
    <div>
      <main className={"main"}>
        <h1 className={"description"}>
          Используйте ToDOList для управления своими проектами с использованием
          досок Канбан. Общайтесь с коллегами во внутрипроектном чате.
        </h1>
        <h1
          className={"linkToSignIn"}
          onClick={() => setSignInPopupActive(true)}
        >
          <Link href="/">Начать пользоваться</Link>
        </h1>
        <Popup active={SignInPopupActive} setActive={setSignInPopupActive}>
          <SignIn
            setPopupSignUpActive={setPopupSignUpActive}
            setPopupSignInActive={setSignInPopupActive}
          />
        </Popup>
        <Popup active={SignUpPopupActive} setActive={setPopupSignUpActive}>
          <SignUp />
        </Popup>
      </main>
    </div>
  );
}
