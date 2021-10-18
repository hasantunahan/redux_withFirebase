import React from 'react';
import {Provider, useSelector} from 'react-redux';
import store from './src/redux/store/store';
import {Navigation} from './src/core/init/navigation/navigation';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
export default App;
