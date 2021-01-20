import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import ErrorNotice from "../errors/ErrorNotice";
import Axios from "axios";

export default function Register(props) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [verifiedPassword, setVerifiedPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const register = async (event) => {
    try {
      const registeredUser = {
        firstName,
        lastName,
        email,
        password,
        verifiedPassword,
      };
      await Axios.post("http://localhost:5000/user/register", registeredUser);
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
      props.resetSearch();
    } catch (err) {
      if (err.response.data.msg) setError(err.response.data.msg);
    }
  };

  return (
    <div className="register-popup-wrapper">
      <div className="popup">
        <div className="popup-header">
          <div className="popup-title">Sign up</div>
          <div className="popup-close">
            <i className="fas fa-times" onClick={props.closeRegisterForm}></i>
          </div>
        </div>
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <div className="popup-content">
          <div className="col">
            <div className="row">
              <div className="form-group">
                <div className="search-wrapper">
                  <div className="search-ico">
                    <div>
                      <div className="search-button" title="first name">
                        <i className="fas fa-user"></i>
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="search-bar"
                    placeholder="First Name"
                    onChange={(event) => setFirstName(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="search-wrapper">
                  <div className="search-ico">
                    <div>
                      <div className="search-button" title="last name">
                        <i className="fas fa-user"></i>
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="search-bar"
                    placeholder="Last Name"
                    onChange={(event) => setLastName(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="search-wrapper">
                  <div className="search-ico">
                    <div>
                      <div className="search-button" title="email">
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
                      <div className="search-button" title="password">
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
              <div className="form-group">
                <div className="search-wrapper">
                  <div className="search-ico">
                    <div>
                      <div className="search-button" title="confirm password">
                        <i className="fas fa-unlock-alt"></i>
                      </div>
                    </div>
                  </div>
                  <input
                    type="password"
                    className="search-bar"
                    placeholder="Confirm Password"
                    onChange={(event) =>
                      setVerifiedPassword(event.target.value)
                    }
                    required
                  />
                </div>
              </div>
              <div className="button-wrapper">
                <div className="sign-up-button" onClick={register}>
                  Sign Up
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
