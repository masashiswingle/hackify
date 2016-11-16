import React, { Component } from 'react';
import { connect } from 'react-redux';
import { artistAlbums } from '../modules/ajax';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = { album: [], videoId: this.props.currentSong.videoId }
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
      that.setState({ album: data.items, videoId: that.props.currentSong.videoId });
      console.log("here is the arr", that.state.album);
    });
  }

  render() {
    console.log("please show something", this.state.album);
    if(this.state.album.length === 0) {
      return (
        <div>Loading...</div>
      )
    }
    return(
      <div>
        {this.state.album.map(function(album, index){
          return (
            <div key={index}>
              <img src={album.images[1].url}></img>
              <div>{album.name}</div>
            </div>
          );
        }, this)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong,
  };
};

export default connect(mapStateToProps)(Album);
