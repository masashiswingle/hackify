import React, { Component } from 'react';
import { connect } from 'react-redux';
import ControlBar from './ControlBarComponent';
import Lineup from './LineupComponent';
import * as helpers from '../modules/ajax';
import { annyangCall } from '../annyang';
import { initiateQueue, initiateHistory, changeCurrentSong, addToQueue, dequeueSong, addToHistory } from '../redux/actions';
import Song from '../modules/Song';
import map from '../visualization/map';
import $ from 'jquery';
import Scrollchor from 'react-scrollchor';

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      infoClicked: false
    };
  }

  searchFromPlayer() {
    helpers.youTubeGetSong($('#srch-term').val(), (response) => {
      var searchedSong = new Song(response.items[0].id.videoId, response.items[0].snippet.title, response.items[0].snippet.thumbnails.default.url);
      this.props.changeCurrentSong(searchedSong);
    });
  }

  queueSong(string) {
    helpers.youTubeGetSong(string = $('#srch-term').val(), (response) => {
      var queuedSong = new Song(response.items[0].id.videoId, response.items[0].snippet.title, response.items[0].snippet.thumbnails.default.url);
      this.props.addToQueue(queuedSong);
    });
  }

  componentDidMount() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: this.props.currentSong.videoId,
      events: {
        onReady: onPlayerReady,
        'onStateChange': onPlayerStateChange.bind(this)
      }
    });

    function onPlayerReady(event) {
      event.target.playVideo();
      event.target.unMute();
    }

    function onPlayerStateChange(event) {
      if (event.data === 0) {
        this.props.addToHistory(this.props.currentSong);
        if (this.props.songQueue.length > 0) {
          this.props.dequeueSong();
        } else {
          this.props.changeCurrentSong('');
        }
      }
    }
    this.props.initiateQueue();

    setInterval(() => {
      if (!this.state.infoClicked) {
        $('#info').fadeOut(500);
        $('#info').fadeIn(500);
      }
    }, 1000);
  }

  displayCommands() {
    $('.player').css('filter', 'blur(2px)');
    this.setState({
      infoClicked: true
    });
  }

  displayPlayer() {
    $('.player').css('filter', 'blur(0px)');
  }

  componentDidUpdate() {
    console.log(this.props.currentSong.videoId);
    console.log(player.getVideoData().video_id);
    if (this.props.currentSong.videoId !== player.getVideoData().video_id) {
      player.cueVideoById(this.props.currentSong.videoId);
      player.playVideo();
    }
  }

  render() {
    annyangCall();
    return (
      <div className="container">
        <div className="player">
          <div className="heading row">
            <div className="col-md-1 inline" id='headlogo'>
              <a href="/"><img id="logo" src={'/assets/logo.png'}/><p>soundBear.</p></a>
            </div>
          </div>

          <Scrollchor to="navbar" className="nav-link"><button className="js-trigger-overlay-about" type="button">about</button></Scrollchor>

          <hr></hr>

          <br></br>

          <div className="row">
            <div className="col-md-4">
              <img id="info" onClick={ this.displayCommands.bind(this) } data-toggle="modal" data-target="#commandModal" src="http://www.tonfly.com/images/defaults/info.png"></img>
            </div>
            <div className="col-md-4">
              <p id="currentTrack"> { this.props.currentSong.artistName } - { this.props.currentSong.songName } </p>
              <p id="currentTrack"> { this.props.currentSong.albumName } </p>
            </div>
          </div>
        </div>

        <br></br>
        <br></br>

        <Lineup />

        <br></br>

        <ControlBar player={ player } />

        <hr></hr>

        <br></br>


        <div className="modal fade" id="commandModal" data-backdrop="static">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <h4 className="centerAlign"><b> Voice Commands </b></h4>
              <img id="closeModal" onClick={ this.displayPlayer.bind(this) } data-dismiss="modal" src="https://cdn3.iconfinder.com/data/icons/virtual-notebook/16/button_close-128.png"></img>
              <br></br>
              <br></br>
              <p className="actions"> Play Song <i className="commands"> "Play Hello by Adele" </i></p>
              <p className="actions"> Add To Queue <i className="commands"> "Add to queue Sweet Virgina by The Rolling Stones" </i></p>
              <p className="actions"> Next <i className="commands"> "Play next song" </i></p>
              <p className="actions"> Previous <i className="commands"> "Play previous song" </i></p>
              <p className="actions"> Pause <i className="commands"> "Stop" </i></p>
              <p className="actions"> Resume <i className="commands"> "Continue" </i></p>
              <br></br>
              <h4 className="centerAlign"><b> Other Functionalities </b></h4>
              <br></br>
              <br></br>
              <p className="actions"> Click on any song in queue or history to play </p>
              <p className="actions"> Remove songs from queue by dragging to trash </p>
              <br></br>
              <br></br>
            </div>
          </div>
        </div>

        <br></br>


      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    view: state.view,
    currentSong: state.currentSong,
    songQueue: state.songQueue,
    songHistory: state.songHistory
  };
};

export default connect(mapStateToProps, { initiateQueue: initiateQueue, changeCurrentSong: changeCurrentSong, addToQueue: addToQueue, dequeueSong: dequeueSong, addToHistory: addToHistory })(Player);
