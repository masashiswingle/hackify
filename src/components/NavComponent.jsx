import React, { Component } from 'react';
import { connect } from 'react-redux';

class Nav extends Component {
  render() {
    return(
      <div>
        <img id="playlist" src={'/assets/playlist.png'} />
        <img id="playlist" src={'/assets/worldMap.png'} />
        <img id="playlist" src={'/assets/audacity.png'} />
        <img id="playlist" src={'/assets/uncheck.png'} />
        <img id="playlist" src={'/assets/tournament.png'} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong
  };
};

export default connect(mapStateToProps)(Nav);
