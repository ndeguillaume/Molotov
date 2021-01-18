import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function LikedDrinksOptions(props) {
  const { userData } = useContext(UserContext);

  return (
    <div className="button-wrapper">
      {userData.user ? (
          <div className="liked-drinks-button" onClick={props.openLikedDrinksPage}>
            MolotLove
          </div>
      ) : null }
    </div>
  );
}