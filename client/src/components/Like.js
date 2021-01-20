import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import Axios from "axios";

export default function Like(props) {
  const { userData, setUserData } = useContext(UserContext);
  const like = async (event) => {
    console.log(event.target)
    if (!props.isLiked) {
      props.addLikedCocktail(props.id);
    } else {
      props.removeLikedCocktail(props.id);
    }
    let token = localStorage.getItem("auth-token");

    await Axios.put("http://localhost:5000/likedDrinks/" + props.id, null, {
      headers: { "x-auth-token": token },
    });
  };

  var icoSrc;
  if (props.isLiked) icoSrc = props.ico;
  else icoSrc = props.icoFL;
  return (
    <>
      {userData.user ? (
        <img className="like-ico" src={icoSrc} onClick={like}></img>
      ) : null}
    </>
  );
}
