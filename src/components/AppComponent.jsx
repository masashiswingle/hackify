import React from 'react';
import { connect } from 'react-redux';
import { log } from '../redux/actions';

class App extends React.Component {
   render() {
      return (
        <div onClick={() => { console.log(this.props); this.props.log('hello2'); }}>
          { this.props.text }
        </div>
      );
   }
}

const mapStateToProps = (state) => {
  return {
    text: state.text
  };
};

export default connect(mapStateToProps, { log: log })(App);
