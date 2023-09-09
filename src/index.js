// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import './index.css';
import '@fontsource/inter';

import { Provider } from 'react-redux';
import store from './redux/store';
import { CssBaseline, CssVarsProvider, GlobalStyles } from '@mui/joy';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider>
      <CssBaseline />
      <GlobalStyles styles={{
        ":root": {
          "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
          "--Cover-width": "40vw", // must be `vw` only
          "--Form-maxWidth": "700px",
          "--Transition-duration": "0.4s" // set to `none` to disable transition
        }
      }} />
      <Provider store={store}>
        <App />
      </Provider>
    </CssVarsProvider>
  </React.StrictMode>,
);
