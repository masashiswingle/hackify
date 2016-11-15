import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Draggable, Droppable } from 'react-drag-and-drop';
import Nav from './NavComponent';
import { addToHistory, dequeueSong, changeCurrentSong, playPrevious, removeFromHistory } from '../redux/actions';
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
    this.props.addToHistory(this.props.currentSong);
    if (this.props.songQueue.length > 0) {
      this.props.dequeueSong();
    } else {
      this.props.changeCurrentSong('');
    }
  }

  previous() {
    this.props.playPrevious();
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
    this.muteOrUnmute.bind(this);
    var that = this;
    setInterval(function () {
      var percentage = that.props.player.getCurrentTime() / that.props.player.getDuration();
      $('.progress-bar').css("width", percentage * 100 + "%")
    }, 1000)
  }

  render() {
    return(
      <div className="row controlDiv">

        <div className="audio-player-buttons">
          <img className="buttons" id="fastBackward" src={'/assets/fastBackward.png'} onClick={ this.previous.bind(this) } />

          <div className="play-button buttons">
            <img className="fa-play" id="player-play" src={'/assets/play.png'} onClick={ this.state.pause ? this.play.bind(this) : this.pause.bind(this) } />
            <img className="fa-pause" id='player-pause' src={'/assets/pause.png'} onClick={ this.state.pause ? this.play.bind(this) : this.pause.bind(this) } />
          </div>

          <img className="buttons" id="stop" src={'/assets/stop.png'} onClick={ this.stop.bind(this) } />

          <img className="buttons" id="fastForward" src={'/assets/fastForward.png'} onClick={ this.next.bind(this) } />

          <Droppable id="trash" types={ ['song'] } onDrop={ this.onDrop.bind(this) }>
            <img id="trashImg" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-trash-outline-128.png"></img>
          </Droppable>

          <div className="volumeDiv buttons">
            <img className="buttons mute-control" id="unmute" src={'/assets/unmute.png'} onClick={ this.muteOrUnmute.bind(this) } />
            <img className="buttons mute-control" id="mute" src={'/assets/mute.png'} onClick={  this.muteOrUnmute.bind(this) } />
            <input type="range" id="volumebar" onChange={ this.volume.bind(this) } title="Volume" min="0" max="100" step="1"></input>
          </div>
        </div>

        <br></br>

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
    currentSong: state.currentSong,
    songQueue: state.songQueue
  };
};

export default connect(mapStateToProps, { addToHistory: addToHistory, dequeueSong: dequeueSong, changeCurrentSong: changeCurrentSong, playPrevious: playPrevious, removeFromHistory: removeFromHistory })(ControlBar);
