import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tree } from '../visualization/artists-tree';
import { artistInfo } from '../modules/ajax';

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = { artistId: this.props.currentSong.artistId }
  }

  displayTree() {
    var returnResult = tree();
    returnResult.resizeOverlay();
    artistInfo(this.props.currentSong.artistId)
      .then(function (info) {
        returnResult.setRoot(info);
      });
  }

  componentDidMount() {
      this.displayTree();
  }

  componentDidUpdate() {
    if (!this.props.currentSong.artistId) {
      document.getElementById('tree-container').innerHTML = 'Sorry, we were unable to find related artists...';
    } else {
      document.getElementById('tree-container').innerHTML = '';
      this.updateTree();
    }
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
