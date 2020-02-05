import React, { Component } from "react";

import "../../utilities.css";

import TextRender from "../TextRender.js";
import Splash from "../Splash.js";
import "./Game.css";
import { Howl, Howler } from "howler";
import sound from "../music/Hello - Adele.mp3";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [
        "Hello, it's me",
        "I was wondering if after all these years you'd like to meet",
        "To go over everything",
        "They say that time's supposed to heal, ya",
        "But I ain't done much healing",
        "Hello, can you hear me?",
        "I'm in California dreaming about who we used to be",
        "When we were younger and free",
        "I've forgotten how it felt before the world fell at our feet",
        "There's such a difference between us",
        "And a million miles",
        "Hello from the other side",
        "I must've called a thousand times",
        "To tell you I'm sorry, for everything that I've done",
        "But when I call you never seem to be home",
        "Hello from the outside",
        "At least I can say that I've tried",
        "To tell you I'm sorry, for breaking your heart",
        "But it don't matter, it clearly doesn't tear you apart anymore",
        "Hello, how are you?",
        "It's so typical of me to talk about myself, I'm sorry",
        "I hope that you're well, yeah",
        "Did you ever make it out of that town where nothing ever happened?",
        "It's no secret",
        "That the both of us are running out of time",
        "So hello from the other side",
        "I must've called a thousand times",
        "To tell you I'm sorry, for everything that I've done",
        "But when I call you never seem to be home",
        "Hello from the outside",
        "At least I can say that I've tried",
        "To tell you I'm sorry, for breaking your heart",
        "But when I call you never seem to be home",
        "Hello from the other side",
        "I must've called a thousand times",
        "To tell you I'm sorry, for everything that I've done",
        "But when I call you never seem to be home",
        "Hello from the outside",
        "At least I can say that I've tried",
        "To tell you I'm sorry, for breaking your heart",
        "But it don't matter, it clearly doesn't tear you apart anymore",
      ],
      wordRates: [
        3 / 2,
        12 / 5,
        4 / 4,
        8 / 3,
        6 / 2,
        5 / 4,
        10 / 6,
        6 / 3,
        12 / 5,
        6 / 6,
        4 / 3,
        5 / 5,
        6 / 5,
        10 / 6,
        10 / 7,
        4 / 6,
        8 / 6,
        9 / 5,
        11 / 8,
        4 / 4,
        11 / 5,
        6 / 5,
        13 / 8,
        3 / 3,
        10 / 7,
        6 / 4,
        6 / 5,
        10 / 5,
        10 / 6,
        4 / 5,
        8 / 5,
        9 / 6,
        11 / 9,
        5 / 5,
        6 / 4,
        10 / 5,
        10 / 7,
        4 / 6,
        8 / 5,
        9 / 6,
        11 / 8,
      ],
      currentLine: 0,
      maxWPM: 0,
      WPMList: [],
      averageWPM: 0,
      showSplash: false,
      game: " Hello",
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
        this.state.song.rate(songSpeed * 1.5);
      } else if (0.7 < songSpeed < 1.2) {
        this.state.song.rate(songSpeed * 1.3);
      } else if (songSpeed > 1.5) {
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
        <h1>Hello - Adele</h1>
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
