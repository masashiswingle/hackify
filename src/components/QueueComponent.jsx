import React, { Component } from 'react';
import { connect } from 'react-redux';

class Queue extends Component {

  log() {
    console.log(this.props.songQueue.length);
  }

  render() {
    // if (this.props.songQueue.length > 0) {
      return (
        <div onClick={ this.log.bind(this) } >Queue</div>
      );
    // }
  }

}

const mapStateToProps = (state) => {
  return {
    songQueue: state.songQueue
  };
};

export default connect(mapStateToProps)(Queue);
