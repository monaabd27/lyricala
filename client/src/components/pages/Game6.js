import React, { Component } from "react";

import "../../utilities.css";

import TextRender from "../TextRender.js";
import Splash from "../Splash.js";
import "./Game.css";
import { Howl, Howler } from "howler";
import sound from "../music/Style - Taylor Swift.mp3";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [
        "Midnight",
        "You come and pick me up, no headlights",
        "Long drive",
        "Could end in burning flames or paradise",
        "Fade into view, oh, it's been a while since I have even heard from you",
        "I should just tell you to leave 'cause I",
        "Know exactly where it leads but I",
        "Watch us go 'round and 'round each time",
        "You got that James Dean daydream look in your eye",
        "And I got that red lip classic thing that you like",
        "And when we go crashing down, we come back every time",
        "Cause we never go out of style",
        "We never go out of style",
        "You got that long hair, slicked back, white t-shirt",
        "And I got that good girl faith and a tight little skirt",
        "And when we go crashing down, we come back every time",
        "Cause we never go out of style",
        "We never go out of style",
        "So it goes",
        "He can't keep his wild eyes on the road",
        "Takes me home",
        "Lights are off, he's taking off his coat, hmm, yeah",
        "I say, 'I heard, oh, that you've been out and about with some other girl, some other girl'",
        "He says, 'What you've heard is true but I",
        "Can't stop thinking about you,' and I",
        "I said, 'I've been there, too, a few times'",
        "You got that James Dean daydream look in your eye",
        "And I got that red lip classic thing that you like",
        "And when we go crashing down, we come back every time",
        "Cause we never go out of style",
        "We never go out of style",
        "You got that long hair, slicked back, white t-shirt",
        "And I got that good girl faith and a tight little skirt",
        "And when we go crashing down, we come back every time",
        "Cause we never go out of style",
        "We never go out of style",
        "Take me home",
        "Just take me home, yeah",
        "Just take me home",
        "out of style",
        "You got that James Dean daydream look in your eye",
        "And I got that red lip classic thing that you like",
        "And when we go crashing down, we come back every time",
        "Cause we never go out of style",
        "We never go out of style",
      ],
      wordRates: [
        1 / 1,
        8 / 4,
        2 / 1,
        7 / 4,
        15 / 7,
        9 / 3,
        7 / 2,
        8 / 3,
        10 / 5,
        11 / 4,
        11 / 5,
        8 / 3,
        6 / 2,
        8 / 5,
        12 / 5,
        11 / 5,
        7 / 3,
        6 / 2,
        3 / 1,
        9 / 4,
        3 / 2,
        10 / 5,
        18 / 10,
        9 / 3,
        7 / 2,
        9 / 3,
        10 / 5,
        11 / 4,
        11 / 5,
        8 / 3,
        6 / 2,
        8 / 5,
        12 / 5,
        11 / 5,
        7 / 3,
        6 / 2,
        3 / 2,
        5 / 3,
        4 / 2,
        3 / 1,
        10 / 5,
        11 / 4,
        11 / 5,
        7 / 3,
        6 / 2,
      ],
      currentLine: 0,
      maxWPM: 0,
      WPMList: [],
      averageWPM: 0,
      showSplash: false,
      game: " Style",
      startTime: 0,
      song: new Howl({
        src: [sound],
        // onplayerror: (Id, error) => {
        //   console.log(Id, error);
        // },
        // onloaderror: (Id, error) => {
        //   console.log(Id, error);
        // },
      }),
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
    this.state.song.play();
  }

  componentWillUnmount() {
    this.state.song.stop();
  }

  incrementLine = (time) => {
    if (this.state.currentLine < this.state.lines.length - 1) {
      this.setState(
        (oldState) => ({
          currentLine: oldState.currentLine + 1,
          startTime: time,
        })
        // () => {
        //   console.log(this.state.startTime);
        // }
      );
    } else {
      let temp = this.state.WPMList;
      temp.shift();
      let sum = temp.reduce((previous, current) => (current += previous));
      let avg = sum / this.state.WPMList.length;
      this.setState(
        {
          averageWPM: avg,
          showSplash: true,
        }
        // () => {
        //   console.log(this.state.averageWPM, avg);
        // }
      );

      // console.log(this.state.averageWPM, avg);
    }
  };
  setMax = (newWPM) => {
    if (this.state.maxWPM < newWPM) {
      this.setState(
        (oldState) => ({
          maxWPM: newWPM,
          WPMList: oldState.WPMList.concat([newWPM]),
          WPM: newWPM,
        })

        // () => {
        //   console.log(this.state.WPMList);
        // }
      );
    } else {
      this.setState((oldState) => ({
        WPMList: oldState.WPMList.concat([newWPM]),
        WPM: newWPM,
      }));
    }
  };

  setSpeed = (currentSpeed) => {
    let baseSpeed = this.state.wordRates[this.state.currentLine];
    let songSpeed = currentSpeed / baseSpeed;
    //console.log(songSpeed);
    //console.log(baseSpeed);
    // if (currentSpeed > baseSpeed / 2) {
    //   this.state.song.rate(songSpeed);
    // } else {
    //   this.state.song.rate(currentSpeed);
    // }
    if (songSpeed < 100) {
      if (songSpeed < 0.8) {
        this.state.song.rate(songSpeed * 1.6);
      } else if (0.7 < songSpeed < 1.2) {
        this.state.song.rate(songSpeed * 1.5);
      } else if (songSpeed > 1.3) {
        this.state.song.rate(songSpeed / 1.2);
      } else {
        this.state.song.rate(songSpeed);
      }
    }
  };
  render() {
    //console.log("user", this.props.user);
    return (
      <>
        <h1>Style - Taylor Swift</h1>
        <div className="content">
          {this.state.showSplash ? (
            <Splash
              max={this.state.maxWPM}
              avg={this.state.averageWPM}
              game={this.state.game}
              user={this.props.user}
            />
          ) : (
            <TextRender
              incrementLine={this.incrementLine}
              line={this.state.lines[this.state.currentLine]}
              startTime={this.state.startTime}
              setMax={this.setMax}
              setSpeed={this.setSpeed}
            />
          )}
        </div>
      </>
    );
  }
}

export default Game;
