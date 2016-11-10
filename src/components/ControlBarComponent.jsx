import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

class ControlBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pause: false
    }
  }

  playOrPause() {
    $('.play-button i').toggle();
    $('.play-button').toggleClass('on');
  }

  play() {
    this.setState({pause: true});
    this.props.player.playVideo();
    this.playOrPause();
  }

  pause() {
    this.setState({pause: false});
    this.props.player.pauseVideo();
    this.playOrPause();
  }

  stop() {
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

  mute() {
    this.props.player.isMuted() ? player.unMute() : player.mute();
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
      <div id="controlDiv">

        <div className='audio-player'>
          <div className="display-panel">
            <img id="display-pic" src={ this.props.currentSong.artwork } />
          </div>

          <div className="control-panel">
            <div className="progress-wrap" onClick={ this.progress.bind(this) }>
              <div className="progress-bar"></div>
            </div>

            <div className="audio-player-buttons">

              <div className="audio-player-button" id='player-backward' onClick={ this.previous.bind(this) }>
                <i className="fa fa-fast-backward"></i>
              </div>

              <div className="audio-player-button play-button">
                <i className="fa fa-play" id='player-play' onClick={ this.play.bind(this) }></i>
                <i className="fa fa-pause" id='player-pause' onClick={ this.pause.bind(this) }></i>
              </div>

              <div className="audio-player-button" id='player-stop' onClick={ this.stop.bind(this) }>
                <i className="fa fa-stop"></i>
              </div>

              <div className="audio-player-button" id='player-forward'  onClick={ this.next.bind(this) }>
                <i className="fa fa-fast-forward"></i>
              </div>

              <div className="audio-player-button mute-button" id='player-volume' onClick={ this.mute.bind(this) }>
                <i className="fa fa-volume-off"></i>
              </div>

              <div className="volumeDiv" onChange={ this.volume.bind(this) }>
                <i id="volumeIcon" className="fa fa-volume-up"></i>
                <input type="range" id="volumebar" title="Volume" min="0" max="100" step="1"></input>
              </div>

            </div>
          </div>
        </div>
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
