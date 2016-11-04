import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchView } from '../redux/actions';

class Landing extends Component {
  render() {
    return (
      // <div onClick={() => { console.log(this.props); this.props.log('hello2'); }}>
      // { this.props.text }
      // </div>
      <div>
        <h1>SoundBear</h1>
        <form>
          <input type="text" />
          <input type="button" value="Search" onClick={() => { this.props.switchView('player'); console.log(this.props); }} />
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
