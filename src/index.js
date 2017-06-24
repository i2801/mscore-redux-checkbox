import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/App_Checkbox';

import { createStore } from 'redux';
import reducers from './reducers';

import { Provider } from 'react-redux';

const store = createStore(reducers);

const MUIApp = () => (
  <MuiThemeProvider>
    <App/>
  </MuiThemeProvider>
);


ReactDom.render(
  <Provider store={store}>
    <MUIApp/>
  </Provider>,
  document.getElementById('root')
);
