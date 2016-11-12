import React, { Component } from 'react';
import { connect } from 'react-redux';


class Lyrics extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>{this.props.lyrics}</div>
    )
  }
}

export default Lyrics;
