import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ajaxGetSongs } from '../modules/ajax';
import { youTubeGetSong } from '../modules/ajax';
import { annyangCall } from '../annyang'


class Player extends Component {

  searchFromPlayer() {
    youTubeGetSong($('#searchPlayerComp').val());
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
      }
    }

    console.log(player);
  }

  componentDidUpdate() {
    this.changeCurrentSong();
  }

  changeCurrentSong() {
    player.loadVideoById(this.props.currentSong);
  }

  queueSong() {
    player.cueVideoById('RB-RcX5DS5A');
  }

  render() {
    annyangCall();
    return (
      <div>
        <h1>SoundBear Jemil</h1>
        <form>
          <input type="text" id = 'searchPlayerComp'/>
          <input type="button" value="Search" onClick={ this.searchFromPlayer.bind(this) } />
          <input type="button" value="Queue" onClick={ this.queueSong.bind(this) } />
        </form>


        <div>Hello</div>

        <div id="conversation"></div>


      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.view,
    currentSong: state.currentSong
  };
};

export default connect(mapStateToProps)(Player);
