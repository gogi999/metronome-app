import React, { Component } from 'react';
import './App.css';
import click1 from './sounds/click1.wav';
import click2 from './sounds/click2.wav';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 99,
      beatsPerMesure: 4
    };

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  }

  startStop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState({
        count: 0,
        playing: true
      }, this.playClick);
    }
  }

  handleBpmChange = event => {
    const bpm = event.target.value;

    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      this.setState({
        count: 0,
        bpm
      });
    } else {
      this.setState({ bpm });
    }

  }

  render() {
    const { playing, bpm } = this.state;

    return (
      <div className="metronome">
        <h2>Metronome</h2>
        <div className="bpm-slider">
          <div>{bpm} BPM</div>
          <input
            type="range"
            min="40"
            max="200"
            value={bpm}
            onChange={this.handleBpmChange} />
        </div>
        <button onClick={this.startStop}>
          {playing ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }

}

export default App;
