import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchViewToPlayer } from '../redux/actions';
import * as helpers from '../modules/ajax';
import Song from '../modules/Song';
import { annyangCall } from '../annyang';
// import * from '../assets/logo';

class Landing extends Component {

  searchFromLanding() {
    helpers.youTubeGetSong($('#srch-term').val(), (response) => {
      var song = new Song(response.items[0].id.videoId, response.items[0].snippet.title, response.items[0].snippet.thumbnails.default.url);
      this.props.switchViewToPlayer('player', song);
    });
  }

  render() {
    annyangCall();
    return (
      <div className="container">

        <div className="heading row">
          <div className="col-md-1 inline">
            <a href="/"><img id="logo" src={'/assets/logo.png'}/><p>soundBear.</p></a>
          </div>
        </div>

        <button className="js-trigger-overlay-about" type="button">About</button>

        <hr></hr>


        <div className="body">
          <div className="title">
            <h1>SoundBear</h1>
            <p>_______</p>
            <h3>Hands-free access to your favorite music</h3>
          </div>
          <button className="js-trigger-overlay-start" type="button">Start Listening</button>

        </div>
        <div id="conversation"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.view
  };
};

export default connect(mapStateToProps, { switchViewToPlayer: switchViewToPlayer })(Landing);
