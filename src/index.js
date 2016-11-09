import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/AppComponent';
import mainReducer from './redux/reducers';

const store = createStore(mainReducer, {view: 'landing'});

setInterval(() => {
    console.log(store.getState());
}, 3000);

render(
  <Provider store={store}>
    <App API_KEY={'AIzaSyBTUh9qsB3l0N-vFkyE3U-FEwuuj5CDHBI'}/>
  </Provider>,
  document.getElementById('app')
);

export default store;
