import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component {

  render() {
    return (
      <div>
        <h1>SoundBear Jemil</h1>
        <form>
          <input type="text" />
          <input type="button" value="Search" />
          <div> { this.props.currentSong } </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    view: state.view,
    currentSong: state.currentSong
  };
};

export default connect(mapStateToProps)(Player);
