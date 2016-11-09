import React, { Component } from 'react';
import { connect } from 'react-redux';

class ControlBar extends Component {
  render() {
    return(
      <div id="controlDiv">
        <div className="progress-wrap">
          <div className="progress-bar"></div>
        </div>
        <div id="playPauseDiv">
          <svg id="play" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <g>
              <title>Play</title>
              <polygon points="1,1 1,24 20,13"></polygon>
            </g>
          </svg>

          <svg id="pause" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <g>
              <title>Pause</title>
              <rect x="2" y="1" width="8px" height="23px"></rect>
              <rect x="15" y="1" width="8px" height="23px"></rect>
            </g>
          </svg>
          <svg id="mute" width="48px" height="48px" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <title>title</title>
              <circle cx="24" cy="24" r="34">
                <title>Mute audio</title>
              </circle>
              <path id="mute-audio-on" className="hidden" transform="scale(0.6), translate(17,18)" d="M38 22h-3.4c0 1.49-.31 2.87-.87 4.1l2.46 2.46C37.33 26.61 38 24.38 38 22zm-8.03.33c0-.11.03-.22.03-.33V10c0-3.32-2.69-6-6-6s-6 2.68-6 6v.37l11.97 11.96zM8.55 6L6 8.55l12.02 12.02v1.44c0 3.31 2.67 6 5.98 6 .45 0 .88-.06 1.3-.15l3.32 3.32c-1.43.66-3 1.03-4.62 1.03-5.52 0-10.6-4.2-10.6-10.2H10c0 6.83 5.44 12.47 12 13.44V42h4v-6.56c1.81-.27 3.53-.9 5.08-1.81L39.45 42 42 39.46 8.55 6z" fill="white"/>
              <path id="mute-audio-off" transform="scale(0.6), translate(17,18)"  d="M24 28c3.31 0 5.98-2.69 5.98-6L30 10c0-3.32-2.68-6-6-6-3.31 0-6 2.68-6 6v12c0 3.31 2.69 6 6 6zm10.6-6c0 6-5.07 10.2-10.6 10.2-5.52 0-10.6-4.2-10.6-10.2H10c0 6.83 5.44 12.47 12 13.44V42h4v-6.56c6.56-.97 12-6.61 12-13.44h-3.4z"  fill="white"/>
            </svg>
        </div>
        <div id="volumeDiv">
          <label htmlFor="volume">Volume</label>
          <input type="range" id="volume" title="Volume" min="0" max="100" step="1" value="100"></input>
        </div>
      </div>
    );
  }
}

export default ControlBar;
