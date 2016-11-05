import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ajaxGetSongs } from '../modules/ajax';
import { youTubeGetSong } from '../modules/ajax';

class Player extends Component {

  searchFromPlayer() {
    youTubeGetSong({query: $('#searchP').val()});
  }

  // switchToLanding() {
  //   ajaxGetSongs($('.input').val());
  //   youTubeGetSong({query: $('.input').val()});
  //   this.props.switchView('landing');
  // }

  render() {
    return (
      <div>
        <h1>SoundBear Jemil</h1>
        <form>
          <input type="text" id = 'searchP'/>
          <input type="button" value="Search" onClick={ this.searchFromPlayer.bind(this)}  />

        </form>
        <iframe  className="embed-responsive-item" src={`https://www.youtube.com/embed/${this.props.currentSong}?autoplay=1`} allowFullScreen ></iframe>

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
