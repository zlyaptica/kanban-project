import { useState } from "react";
import profile from "../public/profile.svg";
import Image from "next/image";
import { navigateToHome } from "@/app/actions";

const HeaderNav = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem("isAuthenticatedUser");
    localStorage.removeItem("user");
    setIsOpenMenu(false)
    navigateToHome();
  }

  return (
    <div>
      <div >
        <Image
          alt="profile"
          src={profile}
          width={40}
          height={40}
        />
        {isOpenMenu ? (
          <button
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
        <div className={"dropdownMenu"} onBlur={() => setIsOpenMenu(false)}>
          <button className={"dropdownItem"} type="button" onClick={() => logout()}>
            Выйти
          </button>
        </div>
      ) : null}
    </div>
  );
};

export { HeaderNav };