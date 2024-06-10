import { useEffect, useRef, useState } from "react";
import profile from "../public/profile.svg";
import Image from "next/image";
import { navigateToHome } from "@/app/actions";
import Link from "next/link";
import useLocalStorage from "@/utils/hooks/useLocalStorage";

const HeaderNav = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [user, setUser] = useLocalStorage("user", null);
  const headerNavRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("isAuthenticatedUser");
    localStorage.removeItem("user");
    setIsOpenMenu(false);
    setUser("");
    navigateToHome();
  };

  useEffect(() => {
    const listener = (e) => {
      if (!headerNavRef.current?.contains(e.target)) {
        setIsOpenMenu(false);
      }
    };
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, []);

  return (
    <div className={"d-flex flex-row align-items-center"}>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          {user ? (
            <Link className="nav-link" href={`/workplace`}>
              Мои доски
            </Link>
          ) : null}
        </li>
      </ul>
      <div id="firstDiv" ref={headerNavRef}>
        <div>
          <Image alt="profile" src={profile} width={40} height={40} />
          {isOpenMenu ? (
            <button
              id="closeMenu"
              className={"btn mt-4"}
              onClick={() => {
                setIsOpenMenu(false);
              }}
            >
              ^
            </button>
          ) : (
            <button
              className={"btn mt-4"}
              onClick={() => {
                setIsOpenMenu(true);
              }}
            >
              v
            </button>
          )}
        </div>
        {isOpenMenu ? (
          <div id="dropdownMenu" className={"dropdownMenu"}>
            <button
              id="dropdownItem"
              className={"dropdownItem"}
              type="button"
              onClick={(e) => logout(e)}
            >
              Выйти
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export { HeaderNav };
