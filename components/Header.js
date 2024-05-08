import Image from "next/image";
import logo from "../public/kanbanlogo.png";
import profile from "../public/profile.svg";
import Link from "next/link";
import { useEffect } from "react";

export default async function Header() {
  const id = "663a59e96623dac88b959d27";
  const [boards, setBoards] = useState(null)
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const getUserProjects = async (userBoards) => {
        const boards = []

        for (let i = 0; i < userBoards.length; i++) {
            const URL = `http://localhost:3000/api/get/board/${user.nickname}/${userBoards[i]}`
            const res = await fetch(URL)
            boards.push(await res.json())
        }
        setBoards(boards)
    }
    let user
    if (typeof window !== "undefined") {
        user = JSON.parse(localStorage.getItem("user"))
        setUserInfo(user)
    }
    getUserProjects(user.boards)
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" href={"/"}>
          <Image alt="profile" src={profile} width={40} height={40} />
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
              <Link className="nav-link" href={`/workplace/board/${id}`}>
                Kanban
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
