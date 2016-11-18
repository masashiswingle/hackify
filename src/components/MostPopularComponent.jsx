import React, { Component } from 'react';
import { getMostPopular } from '../modules/ajax';

class MostPopular extends Component {

  componentDidMount() {
    getMostPopular();
  }

  componentDidUpdate () {
    getMostPopular();
  }

  render() {
    return(
      <div>
        
      </div>
    )
  }
}


export default MostPopular;
