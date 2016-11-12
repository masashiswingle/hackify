import React, { Component } from 'react';
import { connect } from 'react-redux';

class Nav extends Component {
  render() {
    return(
      <div className="navlist">
        <img className="nav" id="playlist" src={'/assets/playlist.png'} />
        <img className="nav" id="worldMap" src={'/assets/worldMap.png'} />
        <img className="nav" id="audacity" src={'/assets/audacity.png'} />
        <img className="nav" id="uncheck" src={'/assets/uncheck.png'} />
        <img className="nav" id="tournament" src={'/assets/tournament.png'} />
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
