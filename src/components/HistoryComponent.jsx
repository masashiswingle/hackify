import React, { Component } from 'react';
import { connect } from 'react-redux';

class History extends Component {

  render() {
    if (this.props.songHistory.length > 0) {
      return (
        <div>
          {
            this.props.songHistory.map(function(song, index) {
              if (index < 5) {
                return <img className="history" src={ song.artwork }></img>
              }
            })
          }
        </div>
      );
    } else {
      return <div></div>
    }
  }

}

const mapStateToProps = (state) => {
  return {
    songHistory: state.songHistory
  };
};

export default connect(mapStateToProps)(History);
