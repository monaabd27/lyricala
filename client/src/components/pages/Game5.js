import React, { Component } from "react";

import "../../utilities.css";

import TextRender from "../TextRender.js";
import Splash from "../Splash.js";
import "./Game.css";
import { Howl, Howler } from "howler";
import sound from "../music/Breathin - Ariana Grande.mp3";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [
        "Some days, things just take way too much of my energy",
        "I look up and the whole room's spinning",
        "You take my cares away",
        "I can so over complicate, people tell me to medicate",
        "Feel my blood runnin', swear the sky's fallin'",
        "I know that all this shit's fabricated, mmm",
        "Time goes by and I can't control my mind",
        "Don't know what else to try, but you tell me every time",
        "Just keep breathin' and breathin' and breathin' and breathin'",
        "And oh, I gotta keep, keep on breathin'",
        "Just keep breathin' and breathin' and breathin' and breathin'",
        "And oh, I gotta keep, keep on breathin', mmm",
        "Sometimes it's hard to find, find my way up into the clouds",
        "Tune it out, they can be so loud",
        "You remind me of a time when things weren't so complicated",
        "All I need is to see your face",
        "Feel my blood runnin', swear the sky's fallin'",
        "I know that all this shit's fabricated, mmm",
        "Time goes by and I can't control my mind",
        "Don't know what else to try, but you tell me every time",
        "Just keep breathin' and breathin' and breathin' and breathin'",
        "And oh, I gotta keep, I keep on breathin'",
        "Just keep breathin' and breathin' and breathin' and breathin'",
        "And oh, I gotta keep, I keep on breathin', mmm, yeah",
        "My, my air",
        "My, my air",
        "My, my air, my air",
        "My, my air",
        "My, my air",
        "My, my air, yeah",
        "Just keep breathin' and breathin' and breathin' and breathin'",
        "And oh, I gotta keep, I keep on breathin'",
        "Just keep breathin' and breathin' and breathin' and breathin'",
        "And oh, I gotta keep, I keep on breathin', mmm, yeah",
        "Feel my blood runnin', swear the sky's fallin'",
        "I keep on breathin'",
        "Time goes by and I can't control my mind",
        "I keep on breathin', mmm, yeah",
      ],
      wordRates: [
        11 / 7,
        8 / 4,
        5 / 4,
        9 / 5,
        8 / 5,
        8 / 4,
        9 / 5,
        12 / 5,
        9 / 6,
        8 / 3,
        9 / 6,
        9 / 4,
        12 / 7,
        8 / 3,
        11 / 7,
        8 / 3,
        8 / 5,
        8 / 4,
        9 / 5,
        12 / 5,
        9 / 6,
        8 / 3,
        9 / 6,
        10 / 5,
        3 / 2,
        3 / 2,
        5 / 3,
        3 / 2,
        3 / 2,
        5 / 3,
        9 / 6,
        8 / 3,
        9 / 6,
        10 / 5,
        8 / 5,
        4 / 3,
        9 / 5,
        6 / 4,
      ],
      currentLine: 0,
      maxWPM: 0,
      WPMList: [],
      averageWPM: 0,
      showSplash: false,
      game: " Breathin",
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
      if (songSpeed < 0.65) {
        this.state.song.rate(songSpeed * 1.1);
      } else if (0.6 < songSpeed < 1.1) {
        this.state.song.rate(songSpeed / 0.9);
      } else if (songSpeed > 1.1) {
        this.state.song.rate(songSpeed / 1.5);
      } else {
        this.state.song.rate(songSpeed);
      }
    }
  };
  render() {
    //console.log("user", this.props.user);
    return (
      <>
        <h1>Breathin - Ariana Grande</h1>
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
