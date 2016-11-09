import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchViewToPlayer } from '../redux/actions';
import * as helpers from '../modules/ajax';
import Song from '../modules/Song';
import { annyangCall } from '../annyang';

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
      <div>
        <h1>SoundBear</h1>
        <div className="col-md-3">
          <form className="navbar-form" role="search">
            <div className="input-group add-on">
              <input className="form-control" placeholder="Search" name="srch-term" id="srch-term" type="text" />
              <div className="input-group-btn">
                <button className="btn btn-default" type="button" onClick={ this.searchFromLanding.bind(this) }><i className="glyphicon glyphicon-search"></i></button>
              </div>
            </div>
          </form>
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
