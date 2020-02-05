import React, { Component } from "react";

import "../../utilities.css";

import TextRender from "../TextRender.js";
import Splash from "../Splash.js";
import "./Game.css";
import { Howl, Howler } from "howler";
import sound from "../music/OneRepublic - Counting Stars-Fix.mp3";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [
        "Lately I've been, I've been losing sleep",
        "Dreaming about the things that we should be",
        "But, baby, I've been, I've been praying hard",
        "Said no more counting dollars, we'll be counting stars",
        "Yeah, we'll be counting stars",
        "I see this life like a swinging vine",
        "Swing my heart across the line",
        "In my face is flashing signs",
        "Seek it out and ye shall find",
        "Old but I'm not that old",
        "Young but I'm not that bold",
        "And I don't think the world is sold",
        "I'm just doing what we're told",
        "I feel something so right by doing the wrong thing",
        "And I feel something so wrong by doing the right thing",
        "I couldn't lie, couldn't lie, couldn't lie",
        "Every thing that kills me makes me feel alive",
        "Lately I've been, I've been losing sleep",
        "Dreaming about the things that we should be",
        "But, baby, I've been, I've been praying hard",
        "Said no more counting dollars, we'll be counting stars",
        "Lately I've been, I've been losing sleep",
        "Dreaming about the things that we should be",
        "But, baby, I've been, I've been praying hard",
        "Said no more counting dollars",
        "We'll be, we'll be counting stars",
        "I feel the love And I feel it burn",
        "Down this river every turn, hope is our four-letter word",
        "Make that money, watch it burn",
        "Old but I'm not that old",
        "Young but I'm not that bold",
        "And I don't think the world is sold",
        "I'm just doing what we're told",
        "And I feel something so wrong by doing the right thing",
        "I couldn't lie, couldn't lie, couldn't lie",
        "Every thing that drowns me makes me wanna fly",
        "Lately I've been, I've been losing sleep",
        "Dreaming about the things that we should be",
        "But, baby, I've been, I've been praying hard",
        "Said no more counting dollars, we'll be counting stars",
        "Lately I've been, I've been losing sleep",
        "Dreaming about the things that we should be",
        "But, baby, I've been, I've been praying hard",
        "Said no more counting dollars",
        "We'll be, we'll be counting stars",
        "Oh, take that money watch it burn",
        "Sink in the river the lessons I've learned",
        "Take that money watch it burn",
        "Sink in the river the lessons I've learned",
        "Take that money watch it burn",
        "Sink in the river the lessons I've learned",
        "Take that money watch it burn",
        "Sink in the river the lessons I've learned",
        "Every thing that kills me makes me feel alive",
        "Lately I've been, I've been losing sleep",
        "Dreaming about the things that we should be",
        "But, baby, I've been, I've been praying hard",
        "Said no more counting dollars, we'll be counting stars",
        "Lately I've been, I've been losing sleep",
        "Dreaming about the things that we should be",
        "But, baby, I've been, I've been praying hard",
        "Said no more counting dollars",
        "We'll be, we'll be counting stars",
        "Oh, take that money watch it burn",
        "Sink in the river the lessons I've learned",
        "Take that money watch it burn",
        "Sink in the river the lessons I've learned",
        "Take that money watch it burn",
        "Sink in the river the lessons I've learned",
        "Take that money watch it burn",
        "Sink in the river the lessons I've learned",
      ],
      wordRates: [
        7 / 5,
        8 / 4,
        8 / 4,
        9 / 5,
        5 / 3,
        8 / 3,
        6 / 1,
        6 / 1,
        7 / 2,
        6 / 2,
        6 / 2,
        8 / 2,
        6 / 2,
        10 / 6,
        11 / 8,
        7 / 3,
        9 / 4,
        7 / 3,
        8 / 3,
        8 / 3,
        9 / 3,
        7 / 4,
        8 / 3,
        5 / 2,
        6 / 3,
        9 / 3,
        10 / 4,
        6 / 2,
        6 / 2,
        6 / 2,
        8 / 3,
        11 / 6,
        7 / 3,
        9 / 5,
        7 / 3,
        8 / 3,
        8 / 4,
        5 / 2,
        4 / 2,
        7 / 4,
        8 / 3,
        8 / 4,
        5 / 2,
        6 / 3,
        7 / 3,
        8 / 2,
        6 / 1,
        8 / 2,
        6 / 1,
        8 / 2,
        6 / 1,
        8 / 2,
        9 / 7,
        7 / 3,
        8 / 4,
        8 / 4,
        9 / 3,
        7 / 3,
        8 / 4,
        8 / 4,
        11 / 4,
        6 / 1,
        8 / 2,
        6 / 2,
        8 / 2,
        6 / 2,
        8 / 2,
        6 / 2,
        8 / 2,
        6 / 1,
        8 / 2,
      ],
      currentLine: 0,
      maxWPM: 0,
      WPMList: [],
      averageWPM: 0,
      showSplash: false,
      game: " Counting Stars",
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
      if (songSpeed < 0.75) {
        this.state.song.rate(songSpeed * 1.2);
      } else if (0.7 < songSpeed < 1) {
        this.state.song.rate(songSpeed * 1.1);
      } else if (songSpeed > 1.2) {
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
        <h1>Counting Stars - One Republic</h1>
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
