import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchViewToPlayer, setCurrentSong } from '../redux/actions';
import * as helpers from '../modules/ajax';
import { switchViewToPlayer } from '../redux/actions';
import { ajaxGetSongs } from '../modules/ajax';
// import { youTubeGetSong } from '../modules/ajax';
import { annyangCall } from '../annyang';

class Landing extends Component {

  switchToPlayer() {
    helpers.ajaxGetSongs($('input').val());
    this.props.switchView('player');
  }

  searchFromLanding() {
      helpers.youTubeGetSong($('#searchLandingComp').val(), (response) =>{
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
