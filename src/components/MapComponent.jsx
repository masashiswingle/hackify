import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from '../visualization/map';

class Map extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    map(this.props.currentSong.countries);
  }


  render() {
    return(
      <div id="basic_choropleth" style={{"position": "relative", "width": "500px", "height": "300px"}}></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong
  };
};

export default connect(mapStateToProps)(Map);
