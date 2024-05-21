import { useState, useEffect } from "react";
import profile from "../public/profile.svg";
import Image from "next/image";
import { navigateToHome } from "@/app/actions";

const HeaderNav = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem("isAuthenticatedUser");
    localStorage.removeItem("user");
    setIsOpenMenu(false);
    navigateToHome();
  };

  const updateDBData = async () => {
    const response = await fetch(`/api/initDB`);
    const data = await response.json();
    console.log(data.message);
    localStorage.removeItem("isAuthenticatedUser");
    localStorage.removeItem("user");
    navigateToHome();
  };

  let isAuthenticatedUser;
  useEffect(() => {
    isAuthenticatedUser = localStorage.getItem("isAuthenticatedUser");
  }, []);

  return (
    <div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            {isAuthenticatedUser ? (
              <Link className="nav-link" href={`/workplace`}>
                Мои доски
              </Link>
            ) : null}
          </li>
          {isAuthenticatedUser ? (
            <li>
              <div>
                <Image alt="profile" src={profile} width={40} height={40} />
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
                <div
                  className={"dropdownMenu"}
                  onBlur={() => setIsOpenMenu(false)}
                >
                  <button
                    className={"dropdownItem"}
                    type="button"
                    onClick={() => logout()}
                  >
                    Выйти
                  </button>
                </div>
              ) : null}
            </li>
          ) : null}
          {/* <li className="nav-item">
              <button className="nav-link" onClick={() => updateDBData()}>
                Загрузить данные в монгу
              </button>
            </li> */}
        </ul>
      </div>
    </div>
  );
};

export { HeaderNav };
