import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchViewToPlayer } from '../redux/actions';
import * as helpers from '../modules/ajax';
import Song from '../modules/Song';
import { annyangCall } from '../annyang';
import { tree }  from '../visualization/artists-tree';
import LandingFeature from './LandingFeatureComponent';
import Git from './GitComponent';
import Scrollchor from 'react-scrollchor';


class Landing extends Component {

  searchFromLanding() {
    helpers.youTubeGetSong($('#srch-term').val(), (response) => {
      var song = new Song(response.items[0].id.videoId, response.items[0].snippet.title, response.items[0].snippet.thumbnails.default.url);
      this.props.switchViewToPlayer('player', song);
    });
  }
  annyang () {
    annyangCall();
    $('#siri').show();
    $('.js-trigger-overlay-start').hide();
  }

  render() {

    return (
      <div className="container" >

        <div className="heading row" >
          <div className="col-md-1 inline" id='headlogo'>
            <a href="/"><img id="logo" src={'/assets/logo.png'}/><p >soundBear.</p></a>
          </div>
        </div>

        <Scrollchor to="landingFeature" className="nav-link"><button className="js-trigger-overlay-about" type="button">about</button></Scrollchor>

        <hr></hr>

        <div className="body">
          <div className="title">
            <h1 id="soundbear">soundBear</h1>
            <p id = 'mainunderline'>_________</p>
            <div id="description">
              <h4>hands-free access</h4>
              <h4>to your favorite music</h4>
            </div>
          </div>
          <button className="js-trigger-overlay-start" onClick = {this.annyang} type="button">start listening</button>
          <img id="siri" src={'/assets/siri.gif'}/>
          <div id="conversation"></div>
        </div>
  
        <div id="landingFeature">
          <LandingFeature />
        </div>


        <br/>

        <Git />

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
