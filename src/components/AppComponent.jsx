import React from 'react';
// import { connect } from 'react-redux';
// import { log } from '../redux/actions';

class App extends React.Component {


  render() {
    return (
      // <div onClick={() => { console.log(this.props); this.props.log('hello2'); }}>
        // { this.props.text }
      // </div>
      <div>
        <h1>SoundBear</h1>
        <form>
          <input type="text" />
          <input type="button" value="Search" onClick="" />
        </form>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     text: state.text,
//     value: 2
//   };
// };

// export default connect(mapStateToProps, { log: log })(App);
export default App;
