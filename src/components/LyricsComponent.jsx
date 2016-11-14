import React, { Component } from 'react';
import { connect } from 'react-redux';

class Lyrics extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>{this.props.lyrics}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong
  };
};

export default connect(mapStateToProps)(Lyrics);
