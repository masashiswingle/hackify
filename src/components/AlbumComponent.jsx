import React, { Component } from 'react';
import { connect } from 'react-redux';
import { artistAlbums } from '../modules/ajax';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = { album: "Searching...", videoId: this.props.currentSong.videoId }
  }

  componentDidMount() {
    this.displayAlbums();
  }

  componentDidUpdate() {
    if (this.props.currentSong.videoId !== this.state.videoId) {
      this.displayAlbums();
    }
  }

  displayAlbums() {
    var that = this;
    artistAlbums(this.props.currentSong.artistName, function(data) {
      console.log("here is my data", data);
      that.setState({ album: data, videoId: that.props.currentSong.videoId });
    });
  }

  render() {
    return(
      <div id ='album'></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong,
  };
};

export default connect(mapStateToProps)(Album);
