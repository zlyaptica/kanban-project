import Image from "next/image";
import logo from "../public/kanbanlogo.png";
import profile from "../public/profile.svg";
import Link from "next/link";
import { useEffect } from "react";
import { navigateToHome } from "@/app/actions";

export default async function Header() {

  const updateDBData = async () => {
    const response = await fetch(`/api/initDB`)
    const data = await response.json()
    console.log(data.message)
    navigateToHome()
    localStorage.removeItem("isAuthenticatedUser")
    localStorage.removeItem("user")

  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" href={"/"}>
          <Image alt="logo" src={logo} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href={"/"}>
                Мои задачи
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href={`/workplace`}>
                Мои доски
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href={`/chat`}>
                Чат доски
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => updateDBData()}>
                Загрузить данные в монгу
              </button>
            </li>
          </ul>
          <Image alt="profile" src={profile} width={40} height={40} />
        </div>
      </div>
    </nav>
  );
}
