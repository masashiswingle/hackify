import React, { Component } from 'react';
import { connect } from 'react-redux';

class Queue extends Component {

  render() {
    if (this.props.songQueue.length > 0) {
      return (
        <div>
          {
            this.props.songQueue.map(function(song) {
              return <img src={song.artwork}></img>
            })
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

export default connect(mapStateToProps)(Queue);
