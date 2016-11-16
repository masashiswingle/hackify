import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from '../visualization/map';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { countries: this.props.currentSong.countries }
  }


  componentDidMount() {
    map(this.props.currentSong.countries);
  }

  componentDidUpdate () {
    if (!this.props.currentSong.countries) {
      document.getElementById("basic_choropleth").innerHTML = 'Sorry, we were unable to find available countries...';
    } else {
      document.getElementById("basic_choropleth").innerHTML = "";
      map(this.props.currentSong.countries);
    }
  }


  render() {
    return(
      <div id="basic_choropleth"></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong
  };
};

export default connect(mapStateToProps)(Map);
