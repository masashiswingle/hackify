import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from './NavComponent';
import $ from 'jquery';

class ControlBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pause: false,
      mute: false
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
    console.log("hello next");
    // this.props.player.nextVideo();
  }

  previous() {
    console.log("Hello previous");
    // this.props.player.previousVideo();
  }

  // muteOrUnmute() {
  //   this.props.player.isMuted() ? player.mute() : player.unMute();
  // }

  mute() {
    this.setState({mute: true});
    $('#mute').hide();
    $('#unmute').show();
    $('#volumebar').hide();
    this.props.player.mute();
  }

  unMute() {
    this.setState({mute: false});
    $('#mute').show();
    $('#unmute').hide();
    $('#volumebar').show();
    this.props.player.unMute();
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

  componentDidMount() {
    var that = this;
    setInterval(function () {
      var percentage = that.props.player.getCurrentTime() / that.props.player.getDuration();
      $('.progress-bar').css("width", percentage * 100 + "%")
    }, 1000)
  }

  render() {
    return(
      <div className="controlDiv">

        <div className="audio-player-buttons">
          <img className="buttons" id="fastBackward" src={'/assets/fastBackward.png'} onClick={ this.previous.bind(this) } />

          <div className="play-button buttons">
            <img className="fa-play" id="player-play" src={'/assets/play.png'} onClick={ this.state.pause ? this.play.bind(this) : this.pause.bind(this) } />
            <img className="fa-pause" id='player-pause' src={'/assets/pause.png'} onClick={ this.state.pause ? this.play.bind(this) : this.pause.bind(this) } />
          </div>

          <img className="buttons" id="stop" src={'/assets/stop.png'} onClick={ this.stop.bind(this) } />

          <img className="buttons" id="fastForward" src={'/assets/fastForward.png'} onClick={ this.next.bind(this) } />


          <div className="volumeDiv buttons">
            <img className="buttons" id="unmute" src={'/assets/unmute.png'} onClick={ this.state.mute ? this.unMute.bind(this) : this.mute.bind(this) } />
            <img className="buttons" id="mute" src={'/assets/mute.png'} onClick={ this.state.mute ? this.unMute.bind(this) : this.mute.bind(this) } />
            <input type="range" id="volumebar" onChange={ this.volume.bind(this) } title="Volume" min="0" max="100" step="1"></input>
          </div>
        </div>

        <div className="progress-wrap" onClick={ this.progress.bind(this) }>
          <div className="progress-bar"></div>
        </div>

        <Nav />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong
  };
};

export default connect(mapStateToProps)(ControlBar);
