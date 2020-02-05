import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Welcome from "./pages/Welcome.js";
import Selection from "./pages/Selection.js";
import Stats from "./pages/Stats.js";
import Confirmation from "./pages/Confirmation.js";
import End from "./pages/End.js";
import Game from "./pages/Game.js";
import Game1 from "./pages/Game1.js";
import Game2 from "./pages/Game2.js";
import Game3 from "./pages/Game3.js";
import Game5 from "./pages/Game5.js";
import Game6 from "./pages/Game6.js";
import NavBar from "./modules/Navbar.js";
import Guide from "./pages/Guide.js";
import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
      console.log(this.state.userId);
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <>
        <NavBar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
        />
        <div className="App-container">
          <Router>
            <Skeleton
              path="/skeleton"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              userId={this.state.userId}
            />
            <NotFound default />
            <Selection path="/" />
            <Welcome path="/welcome" />
            <Selection path="/selection" />
            <Stats path="/stats" user={this.state.userId} />
            <Confirmation path="/confirmation" />
            <Game path="/game" user={this.state.userId} />
            <Game1 path="/game1" user={this.state.userId} />
            <Game2 path="/game2" user={this.state.userId} />
            <Game3 path="/game3" user={this.state.userId} />
            <Game5 path="/game5" user={this.state.userId} />
            <Game6 path="/game6" user={this.state.userId} />
            <Guide path="/guide" user={this.state.userId} />
            <End path="/end" />
          </Router>
        </div>
      </>
    );
  }
}

export default App;
