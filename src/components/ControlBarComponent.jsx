import React, { Component } from 'react';
import $ from 'jquery';

class ControlBar extends Component {
  playOrPause() {
    var $btn = $('.play-button');
    if ($btn.hasClass('on')) {
      this.play();
    } else {
      this.pause();
    }
    $('.play-button i').toggle();
    $btn.toggleClass('on');
  }

  play() {
    this.props.player.playVideo();
  }

  pause() {
    this.props.player.pauseVideo();
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
            <img src={"https://s-media-cache-ak0.pinimg.com/originals/8f/42/f8/8f42f814e0618519261b9cca4404a757.gif"} />
          </div>

          <div className="control-panel">
            <div className="progress-wrap" onClick={ this.progress.bind(this) }>
              <div className="progress-bar"></div>
            </div>

            <div className="audio-player-buttons">

              <div className="audio-player-button" onClick={ this.previous.bind(this) }>
                <i className="fa fa-fast-backward"></i>
              </div>

              <div className="audio-player-button play-button" onClick={ this.playOrPause.bind(this) }>
                <i className="fa fa-play"></i>
                <i className="fa fa-pause"></i>
              </div>

              <div className="audio-player-button" onClick={ this.stop.bind(this) }>
                <i className="fa fa-stop"></i>
              </div>

              <div className="audio-player-button" onClick={ this.next.bind(this) }>
                <i className="fa fa-fast-forward"></i>
              </div>

              <div className="audio-player-button mute-button" onClick={ this.mute.bind(this) }>
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

export default ControlBar;
