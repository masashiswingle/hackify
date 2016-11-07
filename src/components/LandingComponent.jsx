import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchViewToPlayer, setCurrentSong } from '../redux/actions';
import { ajaxGetSongs } from '../modules/ajax';
import { youTubeGetSong } from '../modules/ajax';

class Landing extends Component {

  switchToPlayer() {
    ajaxGetSongs($('input').val());
    this.props.switchView('player');
  }

  searchFromLanding() {
    youTubeGetSong($('#searchLandingComp').val());
    // setTimeout(() => {
    //   document.getElementById('song').pauseVideo();
    // }, 5000);
    // fetch('/searchSong', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     song: document.getElementById('search').value
    //   })
    // })
    //   .then((result) => {
    //     return result.json();
    //   })
    //   .then((response) => {
    //     this.props.switchViewToPlayer('player', response.tracks.href);
    //   });
  }

  render() {
    return (
      <div>
        <h1>SoundBear</h1>
        <form>
          <input id="searchLandingComp" type="text" />
          <input type="button" value="Search" onClick={ this.searchFromLanding.bind(this) } />
        </form>
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
