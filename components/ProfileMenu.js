import { useState } from "react";
import profile from "../public/profile.svg";
import Image from "next/image";
import { navigateToHome } from "@/app/actions";

const ProfileMenu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem("isAuthenticatedUser");
    localStorage.removeItem("user");
    navigateToHome();
  }

  return (
    <div>
      <div onBlur={() => setIsOpenMenu(false)}>
        <Image
          alt="profile"
          src={profile}
          width={40}
          height={40}
          // onClick={() => setIsOpenMenu(!isOpenMenu)}
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
        <div className={"dropdownMenu"}>
          <button className={"dropdownItem"} type="button" onClick={() => logout()}>
            Выйти
          </button>
        </div>
      ) : null}
    </div>
  );
};

export { ProfileMenu };
