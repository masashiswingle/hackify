import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ajaxGetSongs } from '../modules/ajax';
import { youTubeGetSong } from '../modules/ajax';
import { annyangCall } from '../annyang';
import { initiateQueue, changeCurrentSong } from '../redux/actions';

class Player extends Component {

  searchFromPlayer() {
    youTubeGetSong($('#searchPlayerComp').val(), (response) => {
      this.props.changeCurrentSong(response.items[0].id.videoId);
    });
  }

  queueSong() {
    youTubeGetSong($('#searchPlayerComp').val(), (response) => {
      this.props.songQueue.push(response.items[0].id.videoId);
    });
  }

  componentDidMount() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: this.props.currentSong,
      events: {
        onReady: onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });

    function onPlayerReady(event) {
      event.target.playVideo();
    }

    function onPlayerStateChange(event) {
      if (event.data === 0) {
        console.log('ended');
        console.log(player);
      }
    }
    this.props.initiateQueue();
  }

  componentDidUpdate() {
    if (player.getVideoDate && player.getVideoData.videoId !== this.props.currentSong) {
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
