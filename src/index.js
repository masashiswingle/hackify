import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
   render() {
      return (
         <div>
            Hello There!!!
         </div>
      );
   }
}

export default App;


ReactDOM.render(<App />, document.getElementById('app'));
