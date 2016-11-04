import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchView } from '../redux/actions';

class Player extends Component {
  render() {
    return (
      <div>
        <h1>SoundBear Jemil</h1>
        <form>
          <input type="text" />
          <input type="button" value="Search" onClick={() => { this.props.switchView('landing'); console.log(this.props); }} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.view
  };
};

export default connect(mapStateToProps, { switchView: switchView })(Player);
