import React, { Component } from 'react';
import { connect } from 'react-redux';
import { artistTracks } from '../modules/ajax';
import  fu  from '../visualization/top-chart';

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = { tracks: "Searching...", videoId: this.props.currentSong.videoId }
  }

   shouldComponentUpdate() {
    return false;
  }


  componentDidMount() {

    this.displayTracks();
    console.log('trying', this.state.tracks)
    // anychart.onDocumentReady(function() {
    //     fu();
    // });
  }

  componentDidUpdate() {
    console.log('updated', this.state.tracks)
    if (this.props.currentSong.videoId !== this.state.videoId) {
      this.displayTracks();
    }
  }

  displayTracks() {
    var that = this;
    artistTracks(this.props.currentSong.artistName, function(data) {
      console.log("here is my data", data);
      fu(data);
      that.setState({ tracks: data, videoId: that.props.currentSong.videoId });
    });
  }

  render() {
    return(
             
      <div id ='track' style={{height: '600px'}}></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong,
  };
};

export default connect(mapStateToProps)(Track);
