import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import { Provider } from './_main/context';
import './i18n';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider>
    <App />
  </Provider>
);

module.hot.accept();
