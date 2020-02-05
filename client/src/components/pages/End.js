import React, { Component } from "react";


import "../../utilities.css";
import "./Skeleton.css";



class End extends Component {
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
        <h1>Average: ___ WPM</h1>
        <h3> High: ____ WPM Low: ____ WPM</h3>
        <h2> Choose another song</h2>
        <h3> -or-</h3>
        <h2> play again</h2>
      </>
    );
  }
}

export default End;
