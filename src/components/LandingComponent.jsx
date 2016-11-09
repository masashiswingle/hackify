import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchViewToPlayer } from '../redux/actions';
import * as helpers from '../modules/ajax';
import { ajaxGetSongs } from '../modules/ajax';
import { annyangCall } from '../annyang';

class Landing extends Component {

  searchFromLanding() {
    helpers.youTubeGetSong($('#searchLandingComp').val(), (response) => {
      console.log(song);
      this.props.switchViewToPlayer('player', response.items[0].id.videoId);
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
