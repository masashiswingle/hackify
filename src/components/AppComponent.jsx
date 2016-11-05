import React from 'react';
import { connect } from 'react-redux';
import { switchView } from '../redux/actions';
import Landing from './LandingComponent';
import Player from './PlayerComponent';

class App extends React.Component {

  render() {
    if (this.props.view === 'landing') {
      return <Landing />;
    } else if (this.props.view === 'player') {
      return <Player />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.view
  };
};

export default connect(mapStateToProps, { switchView: switchView })(App);
