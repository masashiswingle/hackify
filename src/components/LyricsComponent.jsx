import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLyrics } from '../modules/ajax';

class Lyrics extends Component {
  constructor(props) {
    super(props);
    this.state = { lyrics: "Searching...", lyricsDone: false }
  }

  componentDidMount() {
    this.displayLyrics();
  }

  componentDidUpdate() {
    this.displayLyrics();
  }

  displayLyrics() {
    if (this.state.lyricsDone) {
      return;
    }
    var that = this;
    getLyrics(this.props.currentSong.songName, this.props.currentSong.artistName, function(data) {
      that.setState({ lyrics: data, lyricsDone: true });
    });
  }

  render() {
    return(
      <div>{this.state.lyrics}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong
  };
};

export default connect(mapStateToProps)(Lyrics);
