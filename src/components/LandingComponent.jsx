import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchViewToPlayer } from '../redux/actions';
import * as helpers from '../modules/ajax';
import Song from '../modules/Song';
import { annyangCall } from '../annyang';

class Landing extends Component {

  searchFromLanding() {
    helpers.youTubeGetSong($('#searchLandingComp').val(), (response) => {
      var song = new Song(response.items[0].id.videoId, response.items[0].snippet.title, response.items[0].snippet.thumbnails.default.url);
      this.props.switchViewToPlayer('player', song);
    });
  }

  render() {
    annyangCall();
    return (
      <div>
        <h1>SoundBear</h1>
        <form>
          <input id="searchLandingComp" type="text" />
          <input type="button" value="Search" onClick={ this.searchFromLanding.bind(this) } />
        </form>
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
