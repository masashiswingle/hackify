import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/AppComponent';
import switchView from './redux/reducers';

const store = createStore(switchView, { view: 'landing' });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
