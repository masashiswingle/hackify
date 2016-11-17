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
      var obj = {};
      for (var i = 0; i < data.items.length; i++) {
        var item = data.items[i].name;
        if (!obj[item]) {
          obj[item] = data.items[i];
        }
      }
      var uniqAlbumsName = Object.keys(obj);
      var uniqAlbums = [];
      for (var i = 0; i < uniqAlbumsName.length; i++) {
        uniqAlbums.push(obj[uniqAlbumsName[i]]);
      }
      that.setState({ album: uniqAlbums, videoId: that.props.currentSong.videoId });
    });
  }

  render() {
    if(this.state.album.length === 0) {
      return (
        <div>Sorry, we were unable to find related albums...</div>
      )
    }
    return(
      <div className="rows">
        {this.state.album.map(function(album, index){
          if (album.album_type === "album") {
            return (
              <div className="col-sm-3 col-md-3 col-lg-3" key={index}>
                <img id="albumImg" src={album.images[1].url}></img>
                <div id="albumName">{album.name}</div>
              </div>
            );
          }
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
