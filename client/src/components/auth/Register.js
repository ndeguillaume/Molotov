import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import Axios from "axios";

export default function Register(props) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [verifiedPassword, setVerifiedPassword] = useState();

  const { setUserData } = useContext(UserContext);
  const register = async (event) => {
    const registeredUser = {
      firstName,
      lastName,
      email,
      password,
      verifiedPassword,
    };
    await Axios.post("http://localhost:5000/user/register", registeredUser);
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
    <div className="more-information-wrapper">
      <div className="more-information">
        <div className="more-information-header">
          <div className="more-information-title">Sign up</div>
          <div className="more-information-close">
            <i className="fas fa-times" onClick={props.closeRegisterForm}></i>
          </div>
        </div>
        <div className="more-information-ingredients">
          <div className="col">
            <div className="row">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  onChange={(event) => setLastName(event.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
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
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={(event) => setVerifiedPassword(event.target.value)}
                  required
                />
              </div>
              <div className="button-wrapper">
                <div className="register" onClick={register}>
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
