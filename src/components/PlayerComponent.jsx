import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchView } from '../redux/actions';
import { ajaxGetSongs } from '../modules/ajax';

class Player extends Component {

  switchToLanding() {
    ajaxGetSongs($('.input').val());
  }

  render() {
    return (
      <div>
        <h1>SoundBear Jemil</h1>
        <form>
          <input className="input" type="text" />
          <input type="button" value="Search" onClick={ this.switchToLanding.bind(this) } />
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
