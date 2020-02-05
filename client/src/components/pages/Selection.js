import React, { Component } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID

class Selection extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
        <h1>Welcome!</h1>
        <h4>
          <Link className="u-link" to="/guide">
            New here? Check out the beginner's guide
          </Link>
        </h4>
        <h2> Choose a song from below:</h2>
        {/* <a href="/game"> Counting Stars - One Republic</a> */}
        <Link className="u-link" to="/game">
          Counting Stars - One Republic
        </Link>
        <br />
        <br />
        <Link className="u-link" to="/game1">
          Hello - Adele
        </Link>
        <br />
        <br />
        <Link className="u-link" to="/game2">
          Somebody That I Used to Know - Gotye
        </Link>
        <br />
        <br />
        <Link className="u-link" to="/game3">
          All of Me - John Legend
        </Link>
        <br />
        <br />
        <Link className="u-link" to="/game5">
          Breathin - Ariana Grande
        </Link>
        <br />
        <br />
        <Link className="u-link" to="/game6">
          Style - Taylor Swift
        </Link>
      </>
    );
  }
}

export default Selection;
