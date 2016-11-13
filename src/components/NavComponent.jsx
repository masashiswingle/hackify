import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lyrics from './LyricsComponent';
import Map from './MapComponent';
import { getLyrics } from '../modules/ajax';
import map from '../visualization';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lyrics: null,
      showMap: true
    }
  }

  displayLyrics() {
    var that = this;
    getLyrics(this.props.currentSong.songName, this.props.currentSong.artistName, function(data) {
      that.setState({lyrics: data});
    });
  }

  componentDidMount() {
    this.displayLyrics();
  }

  displayMap() {
    this.setState({showMap: false});
    if (this.state.showMap) {
      map(this.props.currentSong.countries);
    }
  }

  render() {
    return(
      <div className="navlist">
        <img className="nav" id="playlist" src={'/assets/playlist.png'} onClick={ this.displayLyrics.bind(this) } />
        <img className="nav" id="worldMap" src={'/assets/worldMap.png'} onClick={ this.displayMap.bind(this) }/>
        <img className="nav" id="audacity" src={'/assets/audacity.png'} />
        <img className="nav" id="uncheck" src={'/assets/uncheck.png'} />
        <img className="nav" id="tournament" src={'/assets/tournament.png'} />
        <Lyrics lyrics={this.state.lyrics} />

        <div id="map">
          <Map />
        </div>
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
