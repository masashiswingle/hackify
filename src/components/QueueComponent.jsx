import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCurrentSong, modifyQueue } from '../redux/actions';

class Queue extends Component {

  selectSongFromQueue(song) {
    var newQueue = this.props.songQueue.filter(function(origSong) {
      if (origSong.videoId !== song.videoId) {
        return origSong;
      }
    });
    this.props.modifyQueue(newQueue);
    this.props.changeCurrentSong(song);
  }

  render() {
    if (this.props.songQueue.length > 0) {
      return (
        <div>
          {
            this.props.songQueue.map(function(song, index) {
              if (index < 5) {
                return <img className="queue available" style={{ zIndex: index }} onClick={ () => { this.selectSongFromQueue(song)} } src={ song.artwork }></img>
              }
            }, this)
          }
        </div>
      );
    } else {
      return <div></div>
    }
  }

}

const mapStateToProps = (state) => {
  return {
    songQueue: state.songQueue
  };
};

export default connect(mapStateToProps, { changeCurrentSong: changeCurrentSong, modifyQueue: modifyQueue })(Queue);
