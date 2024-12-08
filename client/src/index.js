import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from "./components/App";
import WebSocketService from './services/websocket';

// Initialize WebSocket
new WebSocketService(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
