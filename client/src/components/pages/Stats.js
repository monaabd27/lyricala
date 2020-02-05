import React, { Component } from "react";

import { get } from "../../utilities";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID

class Stats extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      max: 0,
      avg: 0,
      songs: [],
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
    if (this.props.user !== undefined) {
      //console.log(`getting data for ${this.props.user}`);
      get("/api/stats", { userId: this.props.user }).then((user) => {
        //console.log(`Retrieved: ${user.highestWPM.toString()}`);
        this.setState({
          max: user.highestWPM,
          avg: user.averageWPM,
          songs: user.mostRecentSongs,
        });
      });
    }
  }

  render() {
    //code here to get our max from database (if logged in) and compute the average and store to variables
    if (this.props.user) {
      if (this.state.max === 0) {
        return (
          <>
            <br></br> <h2>Oops! You need to play some games before you can see your stats!</h2>
          </>
        );
      } else {
        let songString = this.state.songs.toString();
        return (
          <>
            <h1>Stats</h1>
            <h2> Fastest Speed: {this.state.max.toString()} WPM</h2>
            <h2> Average Speed: {this.state.avg.toString()} WPM</h2>
            <h2> 3 Most Recent Songs: {songString}</h2>
          </>
        );
      }
    } else {
      return (
        <>
          <br></br> <h2>Login to save and see your stats!</h2>
        </>
      );
    }
  }
}

export default Stats;
