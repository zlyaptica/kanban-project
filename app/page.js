"use client";

import { Popup } from "@/components/Popup";
import { SignIn } from "@/components/SignIn";
import { SignUp } from "@/components/SignUp";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [SignInPopupActive, setSignInPopupActive] = useState(false);
  const [SignUpPopupActive, setPopupSignUpActive] = useState(false);

  useEffect(() => {
    const isAuthenticatedUser = localStorage.getItem("isAuthenticatedUser");
    if (isAuthenticatedUser) redirect("/workplace", "push");
  }, []);

  return (
    <div>
      <main className={"main"}>
        <h1 className={"description"}>
          Используйте систему управления проектами Middleco для управления своими проектами с использованием
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
            setSignInPopupActive={setSignInPopupActive}
            setPopupSignUpActive={setPopupSignUpActive}
          />
        </Popup>
        <Popup active={SignUpPopupActive} setActive={setPopupSignUpActive}>
          <SignUp />
        </Popup>
      </main>
    </div>
  );
}
