import React from "react";
import "./../../public/style/authpage.css";
import "./../../public/style/error.css";

import Register from "./Register.js";
import Login from "./Login.js";

export default class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      register: false,
    };
    this.registerClick = this.registerClick.bind(this);
    this.closeRegisterForm = this.closeRegisterForm.bind(this);
  }

  registerClick() {
    this.setState({ register: true });
    this.props.resetSearch();
  }

  closeRegisterForm() {
    this.setState({ register: false });
  }

  render() {
    return (
      <div className={`${this.props.color} auth-page container`}>
        <div className="auth-img-wrapper">
          <img
            className="reset-ico"
            src={this.props.colorSrc}
            alt="app-logo"
          ></img>
        </div>
        <div className="auth-wrapper">
          <div>
            <h3>MOLOTOV</h3>
          </div>
          <div>
            <Login
              closeLoginPage={this.props.closeLoginPage}
              registerClick={this.registerClick}
            />
            {this.state.register ? (
              <Register
                closeRegisterForm={this.closeRegisterForm}
                closeLoginPage={this.props.closeLoginPage}
                resetSearch={this.props.resetSearch}
              />
            ) : null}
          </div>
        </div>
        </div>
    );
  }
}
