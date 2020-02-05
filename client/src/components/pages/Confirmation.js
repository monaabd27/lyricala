import React, { Component } from "react";


import "../../utilities.css";
import "./Skeleton.css";



class Confirmation extends Component {
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
        
        <h1>You Chose ____</h1>
        <h3> Multilayer ON OFF</h3>
        <h2> Press Enter to Start</h2>
      </>
    );
  }
}

export default Confirmation;
