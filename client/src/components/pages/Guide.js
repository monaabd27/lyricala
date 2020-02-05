import React, { Component } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./Skeleton.css";
import underline from "../pictures/underline.jpg";
import PartialWrong from "../pictures/PartialWrong.jpg";
import PartialRight from "../pictures/PartialRight.jpg";
import TwoWords from "../pictures/TwoWords.jpg";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID

class Selection extends Component {
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
        <h1>Guide</h1>
        <h3>Basic Info</h3>
        <div>The goal of this game is the have your typing speed match the speed of the song</div>
        <div>The slower (or faster!) you type, the slower (or faster) the song will play</div>
        <div>
          This is a game of speed and accuracy, so make sure to type exactly what's on the screen!
        </div>
        <h3>Game Mechanics</h3>
        <div>
          The song lyrics will appear line by line. Once you finish a line, the next one will appear
          automatically
        </div>
        <br></br> <div>The word you are currently on will be underlined</div>
        <img src={underline} width="350px" height="auto" />
        <br></br>
        <br></br>{" "}
        <div>
          If you are on progressing correctly on a word, the word will start to appear in green
        </div>
        <img src={PartialRight} width="350px" height="auto" />
        <br></br>
        <br></br>{" "}
        <div>Once you start to get off track, the letters will start to appear in red</div>
        <img src={PartialWrong} width="350px" height="auto" />
        <br></br>
        <br></br>{" "}
        <div>
          Once you finish a word, press space to move to the next one, and don't forget punctuation!
        </div>
        <img src={TwoWords} width="350px" height="auto" />
        <br></br>
        <h4>That's it! Make sure to log in to save your overall game stats</h4>
        <div>Good luck!</div>
      </>
    );
  }
}

export default Selection;
