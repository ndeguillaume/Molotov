import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import Axios from "axios";

export default function Like(props) {
  const { userData, setUserData } = useContext(UserContext);

  const like = async (event) => {
    console.log(userData);
    await Axios.put("http://localhost:5000/likedDrinks/" + props.id);
  };
  return (
    <>
      {userData.user ? (
        <img className="like-ico" src={props.icoFL} onClick={like}></img>
      ) : null}
    </>
  );
}
