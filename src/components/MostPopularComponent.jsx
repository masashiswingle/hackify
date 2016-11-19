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
      <div>
        <div className='col-md-offset-2'></div>
        <div className="champions">
          {this.state.result.map(function(champion, index){
            return (
              <div className="mostPlayedSongs col-md-2">
                <div>{index + 1}</div>
                <div>{champion.songName}</div>
                <div>{champion.artistName}</div>
                <div>{champion.views}</div>
              </div>
            );
          }, this)}
        </div>
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
