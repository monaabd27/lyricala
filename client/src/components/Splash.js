import React from "react";
// const express = require("express");
//const User = require("../../../server/models/user.js");
// const router = express.Router();
import { post } from "../utilities";
class Splash extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {

    // }
  }
  componentDidMount() {
    //let maxx = this.props.max.toString();
    //let a = Math.round(this.props.avg);
    //let avrg = a.toString();
    //if logged in, add avg to our list of avgs and update our max as appropriate
    //add code to access the schema for the current user
    //update the max for the current user and add the average to the current list of averages
    //console.log(this.props.game);
    if (this.props.user !== undefined) {
      //console.log("here");
      post("/api/updateStats", {
        userId: this.props.user,
        max: this.props.max,
        avg: Math.round(this.props.avg),
        game: this.props.game,
      });
    }
  }
  render() {
    let maxx = this.props.max.toString();
    let a = Math.round(this.props.avg);
    let avrg = a.toString();
    //if logged in, add avg to our list of avgs and update our max as appropriate
    //add code to access the schema for the current user
    //update the max for the current user and add the average to the current list of averages
    return (
      <div id="splash-page">
        <h1>Average: {avrg} WPM</h1>
        <h3> High: {maxx} WPM</h3>
        <a href="./selection"> Choose another song</a>
        <h3> -or-</h3>
        <a href="./game"> play again</a>
      </div>
    );
  }
}

export default Splash;
