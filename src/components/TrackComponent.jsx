import React, { Component } from 'react';
import { connect } from 'react-redux';
import { artistTracks } from '../modules/ajax';

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = { tracks: "Searching...", videoId: this.props.currentSong.videoId }
  }

  componentDidMount() {
    this.displayTracks();
  }

  componentDidUpdate() {
    if (this.props.currentSong.videoId !== this.state.videoId) {
      this.displayTracks();
    }
  }

  displayTracks() {
    var that = this;
    artistTracks(this.props.currentSong.artistName, function(data) {
      that.setState({ tracks: data, videoId: that.props.currentSong.videoId });
    });
  }

  render() {
    return(
      <div id ='track'></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong,
  };
};

export default connect(mapStateToProps)(Track);
