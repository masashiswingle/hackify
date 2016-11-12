import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from '../visualization';

class Map extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div id="basic_choropleth" style={{"position": "relative", "width": "500px", "height": "300px"}}></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    songQueue: state.songQueue
  };
};

export default connect(mapStateToProps)(Map);
