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
      <div className="champions">
        {this.state.result.map(function(champion, index){
          return (
            <div className="marquee" key={index}>
              <span>{champion.songName} - {champion.artistName} : {champion.views}</span>
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
