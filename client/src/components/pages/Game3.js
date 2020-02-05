import React, { Component } from "react";

import "../../utilities.css";

import TextRender from "../TextRender.js";
import Splash from "../Splash.js";
import "./Game.css";
import { Howl, Howler } from "howler";
import sound from "../music/All of Me - John Legend.mp3";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [
        "What would I do without your smart mouth?",
        "Drawing me in, and you kicking me out",
        "You've got my head spinning, no kidding, I can't pin you down",
        "What's going on in that beautiful mind",
        "I'm on your magical mystery ride",
        "And I'm so dizzy, don't know what hit me, but I'll be alright",
        "My head's under water",
        "But I'm breathing fine",
        "You're crazy and I'm out of my mind",
        "Cause all of me",
        "Loves all of you",
        "Love your curves and all your edges",
        "All your perfect imperfections",
        "Give your all to me",
        "I'll give my all to you",
        "You're my end and my beginning",
        "Even when I lose I'm winning",
        "Cause I give you all of me",
        "And you give me all of you, oh",
        "How many times do I have to tell you",
        "Even when you're crying you're beautiful too",
        "The world is beating you down, I'm around through every mood",
        "You're my downfall, you're my muse",
        "My worst distraction, my rhythm and blues",
        "I can't stop singing, it's ringing, in my head for you",
        "My head's under water",
        "But I'm breathing fine",
        "You're crazy and I'm out of my mind",
        "Cause all of me",
        "Loves all of you",
        "Love your curves and all your edges",
        "All your perfect imperfections",
        "Give your all to me",
        "I'll give my all to you",
        "You're my end and my beginning",
        "Even when I lose I'm winning",
        "Cause I give you all of me",
        "And you give me all of you, oh",
        "Give me all of you",
        "Cards on the table, we're both showing hearts",
        "Risking it all, though it's hard",
        "Cause all of me",
        "Loves all of you",
        "Love your curves and all your edges",
        "All your perfect imperfections",
        "Give your all to me",
        "I'll give my all to you",
        "You're my end and my beginning",
        "Even when I lose I'm winning",
        "Cause I give you all of me",
        "And you give me all of you",
        "I give you all of me",
        "And you give me all of you, oh",
      ],
      wordRates: [
        8 / 4,
        8 / 3,
        13 / 8,
        7 / 4,
        6 / 4,
        13 / 8,
        4 / 4,
        4 / 3,
        8 / 5,
        4 / 3,
        4 / 3,
        7 / 4,
        4 / 4,
        5 / 4,
        6 / 4,
        6 / 3,
        6 / 4,
        7 / 6,
        8 / 10,
        9 / 4,
        7 / 3,
        11 / 7,
        6 / 3,
        7 / 4,
        11 / 8,
        4 / 4,
        4 / 3,
        8 / 5,
        4 / 3,
        4 / 3,
        7 / 4,
        4 / 4,
        5 / 4,
        6 / 4,
        6 / 3,
        6 / 4,
        7 / 6,
        8 / 10,
        5 / 4,
        8 / 7,
        6 / 5,
        4 / 3,
        4 / 3,
        7 / 4,
        4 / 4,
        5 / 4,
        6 / 4,
        6 / 3,
        6 / 4,
        7 / 6,
        7 / 8,
        6 / 6,
        8 / 8,
      ],
      currentLine: 0,
      maxWPM: 0,
      WPMList: [],
      averageWPM: 0,
      showSplash: false,
      game: " All of Me",
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
        this.state.song.rate(songSpeed * 1.3);
      } else if (0.7 < songSpeed < 1.2) {
        this.state.song.rate(songSpeed * 1.1);
      } else if (songSpeed > 1.4) {
        this.state.song.rate(songSpeed / 1.4);
      } else {
        this.state.song.rate(songSpeed);
      }
    }
  };
  render() {
    //console.log("user", this.props.user);
    return (
      <>
        <h1>All of Me - John Legend</h1>
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
