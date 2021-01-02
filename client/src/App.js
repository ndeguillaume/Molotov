import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Axios from "axios";
import UserContext from "./context/UserContext";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await Axios.post(
        "http://localhost:5000/user/isTokenValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenResponse.data) {
        const userResponse = await Axios.get("http://localhost:5000/user/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userResponse.data
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

// import React from "react";
// import "./public/style/app.css";
// import "./public/style/randomCocktail.css";
// import "./public/style/moreInformation.css";
// import "./public/style/fontawesome/css/all.min.css";
// import "./public/style/bootstrap/css/bootstrap.min.css";
// import Navbar from "./components/NavBar";
// import Login from "./components/auth/Login"
// import RandomCocktail from "./components/RandomCocktail";
// import SearchedCocktailsByName from "./components/SearchedCocktailsByName";
// import SearchedCocktailsByIngredient from "./components/SearchedCocktailsByIngredient";

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       reload: 1,
//       url: "",
//       filterOption: false,
//       isLoginPage: false,
//     };
//     this.handleClick = this.handleClick.bind(this);
//     this.resetSearch = this.resetSearch.bind(this);
//     this.filterClick = this.filterClick.bind(this);
//     this.closeFilter = this.closeFilter.bind(this);
//     this.loginClick = this.loginClick.bind(this);
//   }

//   loadMore() {
//     this.setState({ reload: this.state.reload + 1 });
//   }

//   handleClick(searchUrl) {
//     this.setState({ reload: 1 });
//     this.setState({ url: searchUrl });
//   }

//   resetSearch() {
//     this.setState({ reload: 1 });
//     this.setState({ url: "" });
//   }

//   filterClick(e) {
//     e.stopPropagation();
//     this.setState({
//       filterOption: !this.state.filterOption,
//     });
//   }

//   closeFilter() {
//     this.setState({
//       filterOption: false,
//     });
//   }

//   loginClick() {
//     this.setState({
//       isLoginPage: true,
//     });
//   }

//   render() {
//     if (this.state.isLoginPage) {
//       return (
//         <Login />
//       );
//     } else {
//       var cocktails = [];
//       if (this.state.url === "") {
//         var tmp = [];
//         for (let i = 0; i < this.state.reload; i++) {
//           for (let j = 0; j < 8; j++) {
//             tmp.push(i);
//           }
//         }
//         cocktails = tmp.map(function (i) {
//           return (
//             <div className="col">
//               <RandomCocktail />
//             </div>
//           );
//         });
//       } else {
//         if (this.state.url.split("?")[1].split("=")[0] === "s") {
//           cocktails = <SearchedCocktailsByName url={this.state.url} />;
//         } else if (this.state.url.split("?")[1].split("=")[0] === "i") {
//           cocktails = <SearchedCocktailsByIngredient url={this.state.url} />;
//         }
//       }
//       return (
//         <div className="App" onClick={(e) => this.closeFilter(e)}>
//           <Navbar
//             displayFilterDiv={this.state.filterOption}
//             filterClick={this.filterClick}
//             resetSearch={this.resetSearch}
//             handleClick={this.handleClick}
//             loginClick={this.loginClick}
//             search={this.state.search}
//           />
//           <div className="content container">
//             <div className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
//               {cocktails}
//               {this.state.url === "" ? (
//                 <div className="load-more-button-wrapper button-wrapper">
//                   <div onClick={() => this.loadMore()}>Load more...</div>
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       );
//     }
//   }
// }
