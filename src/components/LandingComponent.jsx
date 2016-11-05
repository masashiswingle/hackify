import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchView } from '../redux/actions';

class Landing extends Component {

  switchToPlayer() {
    this.sendSong(document.getElementById('search').value);
    this.props.switchView('player');
  }

  sendSong(song) {
    fetch('/searchSong', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        song: song
      })
    }).then((response) => {
        return response.json();
      })
      .then((formattedResponse) => {
        console.log(formattedResponse);
      });
  }

  render() {
    return (
      <div>
        <h1>SoundBear</h1>
        <form>
          <input id="search" type="text" />
          <input type="button" value="Search" onClick={ this.switchToPlayer.bind(this) } />
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

export default connect(mapStateToProps, { switchView: switchView })(Landing);
