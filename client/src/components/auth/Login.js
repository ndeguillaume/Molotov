import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import ErrorNotice from "../errors/ErrorNotice";
import Axios from "axios";

export default function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const login = async (event) => {
    try {
      const loginResponse = await Axios.post(
        "http://localhost:5000/user/login",
        {
          email,
          password,
        }
      );

      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      props.closeLoginPage();
    } catch (err) {
      if (err.response.data.msg) setError(err.response.data.msg);
    }
  };

  return (
    <div>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <div>
        <div className="form-group">
          <div className="search-wrapper">
            <div className="search-ico">
              <div>
                <div className="search-button" title="Login">
                  <i className="fas fa-envelope"></i>
                </div>
              </div>
            </div>
            <input
              type="email"
              className="search-bar"
              aria-describedby="emailHelp"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="search-wrapper">
            <div className="search-ico">
              <div>
                <div className="search-button" title="Password">
                  <i className="fas fa-unlock-alt"></i>
                </div>
              </div>
            </div>
            <input
              type="password"
              className="search-bar"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <div className="button-wrapper">
        <div className="login-button" onClick={login}>
          Login
        </div>
      </div>
      <div className="register-wrapper">
        <div className="button-wrapper">
          <div
            className="register-button"
            onClick={() => props.registerClick()}
          >
            Create an account
          </div>
        </div>
        <div className="leave-login-page-wrapper">
          <div
            className="leave-login-page"
            onClick={() => props.closeLoginPage()}
          >
            Browse incognito
          </div>
        </div>
      </div>
    </div>
  );
}
