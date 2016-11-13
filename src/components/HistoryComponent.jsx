import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCurrentSong, modifyHistory } from '../redux/actions';

var reverseSongHistory = [null, null, null, null, null];

class History extends Component {

  // selectSongFromQueue(song) {
  //   var newHistory = this.props.songHistory.filter(function(origSong) {
  //     if (origSong.videoId !== song.videoId) {
  //       return origSong;
  //     }
  //   });
  //   console.log(newHistory);
  //   this.props.modifyHistory(newHistory);
  //   this.props.changeCurrentSong(song);
  // }

  render() {

    if (this.props.songHistory.length > 0 && this.props.songHistory.length < 6) {
      reverseSongHistory.shift();
      reverseSongHistory.push(this.props.songHistory[this.props.songHistory.length - 1]);
      return (
        <div>
          {
            reverseSongHistory.map(function(song, index) {
              if (song) {
                // return <img className="history available" onClick={ () => { this.selectSongFromQueue(song)} } src={ song.artwork }></img>
                return <img className="history available" src={ song.artwork }></img>
              } else {
                return <img className="history" src="http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=16295283"></img>
              }
            }, this)
          }
        </div>
      );
    } else if (this.props.songHistory.length > 5) {

    } else {
      return <div></div>
    }
  }

}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    songHistory: state.songHistory
  };
};

export default connect(mapStateToProps, { changeCurrentSong: changeCurrentSong, modifyHistory: modifyHistory })(History);
