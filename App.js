import React from 'react';
import Navigator from './src/navigations/Navigator';
import {Provider} from 'react-redux';
import store from './src/redux/app/store';

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
