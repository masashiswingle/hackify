import React, { Component } from 'react';
import { connect } from 'react-redux';
import Queue from './QueueComponent';

class Lineup extends Component {

  render() {
    return (
      <div className="row">

        <div className="col-md-2 col-md-offset-5">
          <img src={ this.props.currentSong.artwork } ></img>
        </div>

        <Queue />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong
  };
};

export default connect(mapStateToProps)(Lineup);
