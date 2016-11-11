import React, { Component } from 'react';
import { connect } from 'react-redux';
import ControlBar from './ControlBarComponent';
import Lineup from './LineupComponent';
import * as helpers from '../modules/ajax';
import { annyangCall } from '../annyang';
import { initiateQueue, initiateHistory, changeCurrentSong, addToQueue, dequeueSong, addToHistory } from '../redux/actions';
import Song from '../modules/Song';
// import $ from 'jquery';

class Player extends Component {
  searchFromPlayer() {
    helpers.youTubeGetSong($('#srch-term').val(), (response) => {
      var searchedSong = new Song(response.items[0].id.videoId, response.items[0].snippet.title, response.items[0].snippet.thumbnails.default.url);
      this.props.changeCurrentSong(searchedSong);
    });
  }

  queueSong(string) {
    console.log('triggered queue');
    helpers.youTubeGetSong(string = $('#srch-term').val(), (response) => {
      var queuedSong = new Song(response.items[0].id.videoId, response.items[0].snippet.title, response.items[0].snippet.thumbnails.default.url);
      this.props.addToQueue(queuedSong);
      console.log(this.props);
    });
  }

  componentDidMount() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: this.props.currentSong.videoId,
      events: {
        onReady: onPlayerReady,
        'onStateChange': onPlayerStateChange.bind(this)
      }
    });

    function onPlayerReady(event) {
      event.target.playVideo();
    }

    function onPlayerStateChange(event) {
      if (event.data === 0) {
        this.props.addToHistory(this.props.currentSong);
        if (this.props.songQueue.length > 0) {
          this.props.dequeueSong();
        } else {
          this.props.changeCurrentSong('');
        }
      }
    }
    this.props.initiateQueue();
  }

  componentDidUpdate() {
    if (this.props.songHistory[0]) {
      if (this.props.currentSong.videoId !== this.props.songHistory[0].videoId) {
        player.cueVideoById(this.props.currentSong);
        player.playVideo();
      }
    }
  }

  render() {
    annyangCall();
    return (
      <div className="container">

        <div className="heading row">
          <div className="col-md-1">
            <p>soundBear.</p>
          </div>
          <div className="col-md-1 col-md-offset-9">
            <p>Begin</p>
          </div>
          <div className="col-md-1">
            <p>About</p>
          </div>
        </div>

        <hr></hr>

        <br></br>

        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            { this.props.currentSong.artistName } - { this.props.currentSong.songName }
          </div>
        </div>

        <br></br>

        <ControlBar player={ player } />

        <br></br>

        <Lineup />

        <br></br>

        <div id="conversation"></div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    view: state.view,
    currentSong: state.currentSong,
    songQueue: state.songQueue,
    songHistory: state.songHistory
  };
};

export default connect(mapStateToProps, { initiateQueue: initiateQueue, changeCurrentSong: changeCurrentSong, addToQueue: addToQueue, dequeueSong: dequeueSong, addToHistory: addToHistory })(Player);
