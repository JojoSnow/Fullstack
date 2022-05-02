import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { reducer, StateProvider } from "./state";

ReactDOM.render(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  <StateProvider reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById('root')
);
