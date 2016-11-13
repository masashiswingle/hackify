import React, { Component } from 'react';
import { connect } from 'react-redux';
import tree from '../visualization/artists-tree';
import { artistInfo } from '../modules/ajax';

class Tree extends Component {
  constructor(props) {
    super(props);
  }

  updateTree () {
      var returnResult = tree();
      returnResult.resizeOverlay();

      artistInfo(this.currentSong.artistId)
        .then(function (info) {
          returnResult.setRoot(info);
        });
  }

  componentDidMount() {
      this.updateTree();
  }

  componentDidUpdate() {
      this.updateTree();
  }

  render() {
    return(
      <div id ='tree-container'></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong,
  };
};

export default connect(mapStateToProps)(Tree);
