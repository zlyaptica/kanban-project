import { useState } from "react";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const popupHandle = () => {
    props.setPopupSignInActive(false);
    props.setPopupSignUpActive(true);
  };

  const signInSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/users/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.status === 200) {
      const user = await response.json();
      if (typeof window !== 'undefined') {
        localStorage.setItem('isAuthenticatedUser', 'true')
        localStorage.setItem("user", JSON.stringify(user.user))
    }
    }
  };
  return (
    <>
      <form className="m-1" onSubmit={signInSubmit}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="on"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="on"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <p className={"m-0"}>или</p>
      <button className={"btn btn-link p-0"} onClick={() => popupHandle()}>
        Зарегистрироваться
      </button>
    </>
  );
};

export { SignIn };
