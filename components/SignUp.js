import { navigateToWorkplace } from "@/app/actions";
import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/users/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    if (response.status === 201) {
      console.log(data.user);
      if (typeof window !== "undefined") {
        localStorage.setItem("isAuthenticatedUser", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      navigateToWorkplace();
    } else if (response.status === 400) {
      console.log(data.message);
    }
  };

  return (
    <>
      <form onSubmit={signUpSubmit}>
        <div className="mb-3">
          <label className="form-label">Имя пользователя</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Почтовый адрес</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="on"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Пароль</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="on"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Зарегестрироваться
        </button>
      </form>
    </>
  );
};

export { SignUp };
