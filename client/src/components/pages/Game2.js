import React, { Component } from "react";

import "../../utilities.css";

import TextRender from "../TextRender.js";
import Splash from "../Splash.js";
import "./Game.css";
import { Howl, Howler } from "howler";
import sound from "../music/Somebody That I Used to Know - Gotye.mp3";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [
        "Now and then I think of when we were together",
        "Like when you said you felt so happy you could die",
        "Told myself that you were right for me",
        "But felt so lonely in your company",
        "But that was love and it's an ache I still remember",
        "You can get addicted to a certain kind of sadness",
        "Like resignation to the end, always the end",
        "So when we found that we could not make sense",
        "Well you said that we would still be friends",
        "But I'll admit that I was glad it was over",
        "But you didn't have to cut me off",
        "Make out like it never happened and that we were nothing",
        "And I don't even need your love",
        "But you treat me like a stranger and that feels so rough",
        "No, you didn't have to stoop so low",
        "Have your friends collect your records and then change your number",
        "I guess that I don't need that though",
        "Now you're just somebody that I used to know",
        "Now you're just somebody that I used to know",
        "Now you're just somebody that I used to know",
        "Now and then I think of all the times you screwed me over",
        "But had me believing it was always something that I'd done",
        "But I don't wanna live that way",
        "Reading into every word you say",
        "You said that you could let it go",
        "And I wouldn't catch you hung up on somebody that you used to know",
        "But you didn't have to cut me off",
        "Make out like it never happened and that we were nothing",
        "And I don't even need your love",
        "But you treat me like a stranger and that feels so rough",
        "No, you didn't have to stoop so low",
        "Have your friends collect your records and then change your number",
        "I guess that I don't need that though",
        "Now you're just somebody that I used to know",
        "Somebody (I used to know)",
        "Now you're just somebody that I used to know",
        "Somebody (I used to know)",
        "Now you're just somebody that I used to know",
        "I used to know, that I used to know, I used to know somebody",
      ],
      wordRates: [
        10 / 5,
        11 / 5,
        8 / 3,
        7 / 3,
        11 / 5,
        11 / 4,
        8 / 4,
        10 / 2,
        9 / 3,
        10 / 5,
        8 / 3,
        11 / 3,
        7 / 2,
        12 / 3,
        8 / 2,
        11 / 3,
        8 / 2,
        9 / 3,
        9 / 3,
        9 / 3,
        13 / 3,
        11 / 4,
        7 / 3,
        6 / 3,
        8 / 2,
        14 / 5,
        8 / 3,
        11 / 3,
        7 / 2,
        12 / 3,
        8 / 2,
        11 / 3,
        8 / 2,
        9 / 3,
        5 / 3,
        9 / 3,
        5 / 3,
        9 / 3,
        14 / 11,
      ],
      currentLine: 0,
      maxWPM: 0,
      WPMList: [],
      averageWPM: 0,
      showSplash: false,
      game: " Somebody That I Used to Know",
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
    console.log(songSpeed);
    //console.log(baseSpeed);
    // if (currentSpeed > baseSpeed / 2) {
    //   this.state.song.rate(songSpeed);
    // } else {
    //   this.state.song.rate(currentSpeed);
    // }
    if (songSpeed < 100) {
      if (songSpeed < 0.9) {
        this.state.song.rate(songSpeed * 1.5);
      } else if (0.7 < songSpeed < 1.5) {
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
        <h1>Somebody That I Used to Know - Gotye</h1>
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
