import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function AuthOptions(props) {
  const { userData, setUserData } = useContext(UserContext);

  const login = () => props.loginClick();
  const logout = () => {
      setUserData({
          token: undefined,
          user: undefined
      })
      localStorage.setItem("auth-token", "");
      props.resetSearch()
  };

  return (
    <div className="button-wrapper">
      {userData.user ? (
          <div className="log-button" onClick={logout}>
            Logout
          </div>
      ) : (
        <div className="log-button" onClick={login}>
          Login
        </div>
      )}
    </div>
  );
}
