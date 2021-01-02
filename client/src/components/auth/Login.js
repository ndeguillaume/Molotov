import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import Axios from "axios";


export default function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { setUserData } = useContext(UserContext);
  const login = async (event) => {
    const loginResponse = await Axios.post("http://localhost:5000/user/login", {
      email,
      password,
    });

    setUserData({
      token: loginResponse.data.token,
      user: loginResponse.data.user,
    });
    localStorage.setItem("auth-token", loginResponse.data.token);
    props.closeLoginPage();
  };

  return (
    <div className="container-xl">
      <div className="row">
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="button-wrapper">
          <div className="login" onClick={login}>
            Login
          </div>
        </div>
      </div>
      <div className="row">
        <div className="button-wrapper">
          <div className="register-button" onClick={() => props.registerClick()}>
            Create an account
          </div>
        </div>
      </div>
      <div className="row">
        <div
          className="leaveLoginPage"
          onClick={() => props.closeLoginPage()}
        >
          Browse incognito
        </div>
      </div>
    </div>
  );
}
