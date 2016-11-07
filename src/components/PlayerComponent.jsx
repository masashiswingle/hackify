import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ajaxGetSongs } from '../modules/ajax';
import { youTubeGetSong } from '../modules/ajax';


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
        onReady: onPlayerReady
      }
    });

    function onPlayerReady(event) {
      event.target.playVideo();
    }
  }

  componentDidUpdate() {
    this.changeCurrentSong();
  }

  changeCurrentSong() {
    player.loadVideoById(this.props.currentSong);
  }

  render() {
    return (
      <div>
        <h1>SoundBear Jemil</h1>
        <form>
          <input type="text" id = 'searchPlayerComp'/>
          <input type="button" value="Search" onClick={ this.searchFromPlayer.bind(this) } />
        </form>
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
