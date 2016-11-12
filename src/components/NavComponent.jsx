import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lyrics from './LyricsComponent';
import { getLyrics } from '../modules/ajax';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lyrics: null
    }
  }

  displayLyrics() {
    var that = this;
    getLyrics(this.props.currentSong.songName, this.props.currentSong.artistName, function(data) {
      that.setState({lyrics: data});
    });
  }

  render() {
    return(
      <div className="navlist">
        <img className="nav" id="playlist" src={'/assets/playlist.png'} onClick={ this.displayLyrics.bind(this) } />
        <img className="nav" id="worldMap" src={'/assets/worldMap.png'} />
        <img className="nav" id="audacity" src={'/assets/audacity.png'} />
        <img className="nav" id="uncheck" src={'/assets/uncheck.png'} />
        <img className="nav" id="tournament" src={'/assets/tournament.png'} />
        <Lyrics lyrics={this.state.lyrics} />
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
