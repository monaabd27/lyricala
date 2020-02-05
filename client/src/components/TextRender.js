import React from "react";
import "./pages/Game.css";

//Used code from https://github.com/caathylee/typing-game-react/blob/master/src/components/TextExcerpt.js
class TextRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: 0,
      seconds: 0,
      minutes: 0,
      timeShown: "00:00",
      wpm: 0,
      index: 0,
      wordCount: 0,
      startTime: 0,
    };
    this.stopwatch = null;
  }

  showTimePassed = () => {
    this.setState({
      timePassed: this.state.timePassed + 1,
      seconds: this.state.seconds + 1,
      timeShown: this.state.minutes + ":" + this.state.seconds,
    });
    if (this.state.wordCount > 0) {
      this.setState({
        wpm: Math.floor(this.state.wordCount * (60 / this.state.timePassed)),
      });
    }
    if (this.state.seconds < 10) {
      this.setState({
        timeShown: 0 + this.state.minutes + ":0" + this.state.seconds,
      });
    }

    if (this.state.seconds >= 60) {
      this.setState({
        minutes: this.state.minutes + 1,
        seconds: 0,
      });
    }
  };

  handleChange = () => {
    let text = this.props.line.split(" ");
    var currentWord = text[this.state.index];
    var lastWord = this.state.index >= text.length - 1;
    var inputFieldValue = document.getElementById("input-field").value;

    if (inputFieldValue == (lastWord ? currentWord : currentWord + " ")) {
      this.setState({
        index: this.state.index + 1,
        wordCount: this.state.wordCount + 1,
      });
      let currentSpeed = (this.state.index + 1) / (this.state.timePassed - this.props.startTime);

      this.props.setSpeed(currentSpeed);

      document.getElementById("input-field").value = "";

      if (lastWord) {
        //this.stopwatch = null;
        this.props.incrementLine(this.state.timePassed);
        this.setState({
          index: 0,
        });
      }
      this.props.setMax(this.state.wpm);
    }
  };

  render() {
    let text = this.props.line.split(" ");
    var correct = text.slice(0, this.state.index).join(" ");
    if (this.state.index < text.length) correct += " ";
    var rest =
      this.state.index <= text.length ? " " + text.slice(this.state.index + 1).join(" ") : "";

    var word = text[this.state.index];

    var letterCorrect = "";
    var letterIncorrect = "";
    var letterRest = "";

    var inputField = document.getElementById("input-field");
    var input = inputField ? inputField.value : "";

    var incorrect = false;
    for (var i = 0; word && i < word.length; i++) {
      if (input[i] == undefined) {
        letterRest += word[i];
      } else if (!incorrect && word[i] == input[i]) {
        letterCorrect += word[i];
      } else {
        letterIncorrect += word[i];
        incorrect = true;
      }
    }
    if (this.stopwatch === null) {
      this.stopwatch = setInterval(this.showTimePassed, 1000);
    }

    return (
      <div id="text-excerpt">
        <div className="song">
          <p id="song">
            <span className="right-letter">{correct}</span>
            <span className="current-word">
              <span className="right-letter">{letterCorrect}</span>
              <span className="wrong-letter">{letterIncorrect}</span>
              {letterRest}
            </span>
            {rest}
          </p>
        </div>

        <input
          id="input-field"
          className="input-field"
          onChange={this.handleChange}
          type="text"
          placeholder="type here"
        />
        <p id="time-passed" className="stats">
          Time Elapsed: {this.state.timeShown} WPM: {this.state.wpm}
        </p>
      </div>
    );
  }
}

export default TextRender;
