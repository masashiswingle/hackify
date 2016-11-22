import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Draggable, Droppable } from 'react-drag-and-drop';
import Nav from './NavComponent';
import { addToHistory, dequeueSong, changeCurrentSong, playPrevious, removeFromHistory } from '../redux/actions';
import $ from 'jquery';
import Scrollchor from 'react-scrollchor';

class ControlBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pause: false,
      mute: false,
      totalTime: "",
      currentTime: ""
    }
  }

  play() {
    this.setState({pause: false});
    $('.fa-play').hide();
    $('.fa-pause').show();
    this.props.player.playVideo();
  }

  pause() {
    this.setState({pause: true});
    $('.fa-play').show();
    $('.fa-pause').hide();
    this.props.player.pauseVideo();
  }

  stop() {
    this.setState({pause: true});
    $('.fa-play').show();
    $('.fa-pause').hide();
    this.props.player.stopVideo();
  }

  next() {
    this.props.addToHistory(this.props.currentSong);
    if (this.props.songQueue.length > 0) {
      this.props.dequeueSong();
    } else {
      this.props.changeCurrentSong('');
    }
  }

  previous() {
    this.totalDuration();
    this.props.playPrevious();
  }

  formatDuration(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (hr < 10) {
      hr = "0" + hr;
    }
    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }
    if (hr) {
      hr = "00";
    }
    console.log(min+":"+sec);
    return min + ':' + sec;
  }

  totalDuration() {
    var totalSec = this.props.player.getDuration();
    var totalT = this.formatDuration(totalSec);
    console.log(typeof totalT);
    this.setState({totalTime: totalT});
    console.log(this.state);
  }

  currentDuration() {
    var currentSec = this.props.player.getCurrentTime();
    this.formatDuration(currentSec);
  }

  muteOrUnmute() {
    if (this.props.player.isMuted()) {
      this.props.player.unMute();
      this.setState({mute: false});
      $('#volumebar').val(50);
      this.props.player.setVolume(50);
    } else {
      this.props.player.mute();
      $('#volumebar').val(0);
    }
    $('.mute-control').toggle();
  }

  volume() {
    var currentVolume = $('#volumebar').val();
    this.props.player.setVolume(currentVolume);
  }

  progress(e) {
    var totalLength = $('.progress-wrap').innerWidth();
    var currentLength = e.pageX - $(".progress-wrap").offset().left;
    var percentage = currentLength / totalLength;

    $('.progress-bar').css("width", percentage * 100 + "%")
    var newTime = this.props.player.getDuration() * percentage;
    this.props.player.seekTo(newTime);
  }

  onDrop(songId) {
    this.props.removeFromHistory(songId);
  }

  componentDidMount() {
    // this.totalDuration();
    this.muteOrUnmute.bind(this);
    var that = this;
    setInterval(function () {
      var percentage = that.props.player.getCurrentTime() / that.props.player.getDuration();
      $('.progress-bar').css("width", percentage * 100 + "%")
    }, 1000);
    console.log("in here", this.state);
  }

  componentWillReceiveProps() {
    // this.totalDuration();
    // this.setState({totalTime: totalT});
    // console.log(this.state);
  }

  componentDidUpdate() {
    if (this.props.player.getVideoData().video_id !== this.props.currentSong.videoId) {
      $('.fa-play').hide();
      $('.fa-pause').show();
    }
  }

  render() {
    return(
      <div>
        <div className="row controlDiv">

          <div className="audio-player-buttons col-md-offset-3 col-md-6">
            <img className="buttons" id="fastBackward" src={'/assets/fastBackward.png'} onClick={ this.previous.bind(this) } />

            <div className="play-button buttons">
              <img className="fa-play" id="player-play" src={'/assets/play.png'} onClick={ this.state.pause ? this.play.bind(this) : this.pause.bind(this) } />
              <img className="fa-pause" id='player-pause' src={'/assets/pause.png'} onClick={ this.state.pause ? this.play.bind(this) : this.pause.bind(this) } />
            </div>

            <img className="buttons" id="stop" src={'/assets/stop.png'} onClick={ this.stop.bind(this) } />

            <img className="buttons" id="fastForward" src={'/assets/fastForward.png'} onClick={ this.next.bind(this) } />
          </div>

          <div className="col-md-3">
            <Droppable id="trash" types={ ['song'] } onDrop={ this.onDrop.bind(this) }>
              <img id="trashImg" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-trash-outline-128.png"></img>
            </Droppable>

            <div className="volumeDiv">
              <img className="buttons mute-control" id="unmute" src={'/assets/unmute.png'} onClick={ this.muteOrUnmute.bind(this) } />
              <img className="buttons mute-control" id="mute" src={'/assets/mute.png'} onClick={  this.muteOrUnmute.bind(this) } />
              <input type="range" id="volumebar" onChange={ this.volume.bind(this) } title="Volume" min="0" max="100" step="1"></input>
            </div>
          </div>
        </div>

        <div className="row controlBar">
          <div id="conversationPlayer" className="col-md-offset-3 col-md-6">here is the total: {this.state.totalTime}</div>
        </div>

        <div className="row progress-wrap" onClick={ this.progress.bind(this) }>
          <div className="progress-bar"></div>
        </div>

        <br></br>

        <div id="navbar" className="row controlDiv">
          <Nav />
        </div>


      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong,
    songQueue: state.songQueue,
    restartSong: state.restartSong
  };
};

export default connect(mapStateToProps, { addToHistory: addToHistory, dequeueSong: dequeueSong, changeCurrentSong: changeCurrentSong, playPrevious: playPrevious, removeFromHistory: removeFromHistory })(ControlBar);
