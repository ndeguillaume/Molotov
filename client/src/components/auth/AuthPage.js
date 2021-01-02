import React from "react";
import Register from "./Register.js";
import Login from "./Login.js"

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
  }

  closeRegisterForm() {
    this.setState({ register: false });
  }

  render() {
    return (<div>
        <Login closeLoginPage={this.props.closeLoginPage} registerClick={this.registerClick} />
          {this.state.register ? (
              <Register closeRegisterForm={this.closeRegisterForm} closeLoginPage={this.props.closeLoginPage} />
              ) : null}
        </div>
    );
  }
}
