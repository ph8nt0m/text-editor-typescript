import { createElement as h, StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { load } from 'uinix-ui';

import App from './App';
import { config, system } from './ui';

load({ config, h, system });

const rootElement = document.getElementById('root');
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
