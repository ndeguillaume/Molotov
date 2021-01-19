import React from "react";
import Axios from "axios";

export default class DrinkRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      rating: 0,
      average: 0,
      numberOfRatings: 0,
      hasARating: false,
    };
    this.rate = this.rate.bind(this);
  }

  async rate(e) {
    const newRating = e.target.id.charAt(0);
    let token = localStorage.getItem("auth-token");
    if (this.state.hasARating) {
      if (newRating === this.state.rating) {
        await Axios.delete("http://localhost:5000/drinkRating/" + this.props.drink, {
          headers: { "x-auth-token": token },
        });
        this.setState({ rating: 0 });
        this.setState({ hasARating: false });
      } else {
        await Axios.put(
          "http://localhost:5000/drinkRating/" + this.props.drink,
          { rating: newRating },
          {
            headers: { "x-auth-token": token },
          }
        );
        this.setState({ rating: newRating });
      }
    } else {
      if (newRating == this.state.rating) {
        await Axios.post(
          "http://localhost:5000/drinkRating/" + this.props.drink,
          { rating: 0 },
          {
            headers: { "x-auth-token": token },
          }
        );
        this.setState({ rating: 0 });
      } else {
        await Axios.post(
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
    await Axios.get(
      "http://localhost:5000/drinkRating/" + this.props.drink + "/averageRating"
    ).then((response) => {
      if (response.data !== null) {
        this.setState({
          average: response.data.average,
          numberOfRatings: response.data.numberOfRatings,
        });
      }
    });
  }

  async componentDidMount() {
    await Axios.get(
      "http://localhost:5000/drinkRating/" + this.props.drink + "/averageRating"
    ).then((response) => {
      if (response.data !== null) {
        this.setState({
          average: response.data.average,
          numberOfRatings: response.data.numberOfRatings,
        });
      }
    });
    await Axios.get("http://localhost:5000/drinkRating/" + this.props.drink, {
      headers: { "x-auth-token": localStorage.getItem("auth-token") },
    }).then((response) => {
      this.setState({ hasARating: response.data !== null });
      if (response.data !== null) {
        this.setState({ rating: response.data });
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
      const average = this.state.average;
      const numberOfRatings = this.state.numberOfRatings;
      return (
        <>
          <div className="drink-rating">
            <div className="user-rating">
              <h3>Your rating</h3>
              <p>{content}</p>
            </div>
            <div className="average-rating">
              <h3>Average rating</h3>
              <span className="average">
                {average}
                <i className="far fa-star"></i>
                {numberOfRatings}
                <i className="fas fa-users"></i>
              </span>
            </div>
          </div>
        </>
      );
    }
  }
}
