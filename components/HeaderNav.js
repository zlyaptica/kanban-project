import { useEffect, useRef, useState } from "react";
import profile from "../public/profile.svg";
import Image from "next/image";
import { navigateToHome } from "@/app/actions";

const HeaderNav = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const headerNavRef = useRef(null)

  const logout = (e) => {
      localStorage.removeItem("isAuthenticatedUser");
      localStorage.removeItem("user");
      setIsOpenMenu(false)
      navigateToHome();
  }

  useEffect(() => {
    const listener = (e) => {
      if (!headerNavRef.current?.contains(e.target)) {
        setIsOpenMenu(false)
      }
    }
    document.addEventListener("click", listener)
    return () => document.removeEventListener("click", listener)
  }, [])

  return (
    <div id="firstDiv" ref={headerNavRef}>
      <div >
        <Image
          alt="profile"
          src={profile}
          width={40}
          height={40}
        />
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
          <button id="dropdownItem" className={"dropdownItem"} type="button" onClick={(e) => logout(e)}>
            Выйти
          </button>
        </div>
      ) : null}
    </div>
  );
};

export { HeaderNav };

