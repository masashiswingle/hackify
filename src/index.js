import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/AppComponent';
import testRedux from './redux/reducers';

const store = createStore(testRedux, { text: 'hello1' });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
