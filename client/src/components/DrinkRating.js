import React from "react";
import Axios from "axios";

export default class DrinkRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      rating: 0,
      hasARating: false,
    };
    this.rate = this.rate.bind(this);
  }

  rate(e) {
    const newRating = e.target.id.charAt(0);
    let token = localStorage.getItem("auth-token");
    if (this.state.hasARating) {
      if (newRating == this.state.rating) {
        Axios.delete("http://localhost:5000/drinkRating/" + this.props.drink, {
          headers: { "x-auth-token": token },
        });
        this.setState({ rating: 0 });
        this.setState({ hasARating: false });
      } else {
        Axios.put(
          "http://localhost:5000/drinkRating/" + this.props.drink,
          { rating: newRating },
          {
            headers: { "x-auth-token": token },
          }
        );
        this.setState({ rating: newRating });
      }
    } else {
      if (newRating === this.state.rating) {
        Axios.post(
          "http://localhost:5000/drinkRating/" + this.props.drink,
          { rating: 0 },
          {
            headers: { "x-auth-token": token },
          }
        );
        this.setState({ rating: 0 });
      } else {
        Axios.post(
          "http://localhost:5000/drinkRating/" + this.props.drink,
          { rating: newRating },
          {
            headers: { "x-auth-token": token },
          }
        );
        this.setState({ rating: newRating });
      }
      this.setState({ hasARating: true });
    }
  }

  componentDidMount() {
    Axios.get("http://localhost:5000/drinkRating/" + this.props.drink, {
      headers: { "x-auth-token": localStorage.getItem("auth-token") },
    }).then((response) => {
      this.setState({ hasARating: response.data !== null });
      if (response.data !== null) {
        this.setState({ rating: response.data });
        console.log("rating set à " + this.state.rating);
      }
      this.setState({ isLoaded: true });
    });
  }

  render() {
    const { isLoaded } = this.state;
    const content = [];
    let cpt = 1;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      for (let i = 1; i <= this.state.rating; i++) {
        content.push(
          <i
            id={cpt++ + "star"}
            class="fas fa-star"
            onClick={(e) => {
              this.rate(e);
            }}
          ></i>
        );
      }
      for (let i = 1; i <= 5 - this.state.rating; i++) {
        content.push(
          <i
            id={cpt++ + "star"}
            class="far fa-star"
            onClick={(e) => {
              this.rate(e);
            }}
          ></i>
        );
      }
      return (
        <>
          <div className="drink-rating">
            <h3>Your rating</h3>
            <p>{content}</p>
          </div>
        </>
      );
    }
  }
}
