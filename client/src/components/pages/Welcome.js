import React, { Component } from "react";

import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID

class Welcome extends Component {
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
        <h2> Login</h2>
        <h3> -or-</h3>
        <h2> play anonymously</h2>
      </>
    );
  }
}

export default Welcome;
