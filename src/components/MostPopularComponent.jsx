import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMostPopular } from '../modules/ajax';

class MostPopular extends Component {
  constructor(props) {
    super(props);
    this.state = { result: [], videoId: this.props.currentSong.videoId }
  }

  displayMostPopular() {
    var that = this;
    getMostPopular(function(data) {
      that.setState({ result: data });
    });
  }

  componentDidMount() {
    this.displayMostPopular();
  }

  componentDidUpdate () {
    if (this.props.currentSong.videoId !== this.state.videoId) {
      this.displayMostPopular();
    }
  }

  render() {
    return (
      <div className="container">
        <h1 id="topten">soundBear Top Ten</h1>
        <div className="row left top">
          <h3 className="toptennav col-sm-4 col-md-4 col-lg-4">Song</h3>
          <h3 className="toptennav col-sm-4 col-md-4 col-lg-4">Artist</h3>
          <h3 className="toptennav col-sm-4 col-md-4 col-lg-4">Views</h3>
        </div>
        {this.state.result.map(function(champion, index){
          return (
            <div className="row left" key={index}>
              <div className="songName col-sm-4 col-md-4 col-lg-4">{index+1}. {champion.songName}</div>
              <div className="artistName col-sm-4 col-md-4 col-lg-4">{champion.artistName}</div>
              <div className="views col-sm-4 col-md-4 col-lg-4">{champion.views}</div>
            </div>
          );
        }, this)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong,
  };
};

export default connect(mapStateToProps)(MostPopular);
