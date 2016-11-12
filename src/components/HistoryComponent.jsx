import React, { Component } from 'react';
import { connect } from 'react-redux';

var reverseSongHistory = [null, null, null, null, null];

class History extends Component {

  render() {

    if (this.props.songHistory.length > 0 && this.props.songHistory.length < 6) {
      reverseSongHistory.shift();
      reverseSongHistory.push(this.props.songHistory[this.props.songHistory.length - 1]);
      return (
        <div>
          {
            reverseSongHistory.map(function(song, index) {
              if (song) {
                return <img className="history available" src={ song.artwork }></img>
              } else {
                return <img className="history" src="http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=16295283"></img>
              }
            })
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
  return {
    songHistory: state.songHistory
  };
};

export default connect(mapStateToProps)(History);
