import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchView } from '../redux/actions';
import { ajaxGetSongs } from '../modules/ajax';

class Landing extends Component {

  switchToPlayer() {
    ajaxGetSongs($('input').val());
    this.props.switchView('player');
  }

  render() {
    return (
      <div>
        <h1>SoundBear</h1>
        <form>
          <input className="input" type="text" />
          <input type="button" value="Search" onClick={ this.switchToPlayer.bind(this) } />
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

export default connect(mapStateToProps, { switchView: switchView })(Landing);
