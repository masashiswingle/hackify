import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ajaxGetSongs } from '../modules/ajax';
import * as helpers from '../modules/ajax';
import { annyangCall } from '../annyang';
import { initiateQueue, changeCurrentSong } from '../redux/actions';
import ControlBar from './ControlBarComponent';
import $ from 'jquery';

class Player extends Component {

  searchFromPlayer() {
    helpers.youTubeGetSong($('#searchPlayerComp').val(), (response) => {
      this.props.changeCurrentSong(response.items[0].id.videoId);
    });
  }

  queueSong() {
    helpers.youTubeGetSong($('#searchPlayerComp').val(), (response) => {
      this.props.songQueue.push(response.items[0].id.videoId);
    });
  }

  componentDidMount() {
    console.log(this);
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: this.props.currentSong,
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
        if (this.props.songQueue.length > 0) {
          this.props.changeCurrentSong(this.props.songQueue[0]);
          this.props.songQueue.shift();
        }
      }
    }
    this.props.initiateQueue();
  }

  componentDidUpdate() {
    if (player.getVideoData && player.getVideoData.videoId !== this.props.currentSong) {
      player.cueVideoById(this.props.currentSong);
      player.playVideo();
    }
  }

  render() {
    annyangCall();
    return (
      <div>
        <h1>SoundBear Jemil</h1>
        <form>
          <input type="text" id="searchPlayerComp" />
          <input type="button" value="Search" onClick={ this.searchFromPlayer.bind(this) } />
          <input type="button" value="Queue" onClick={ this.queueSong.bind(this) } />
        </form>
        <ControlBar />
        <div id="conversation"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.view,
    currentSong: state.currentSong,
    songQueue: state.songQueue
  };
};

export default connect(mapStateToProps, { initiateQueue: initiateQueue, changeCurrentSong: changeCurrentSong })(Player);
