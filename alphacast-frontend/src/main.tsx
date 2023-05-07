// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Renderer = () => <App />;

// dev 環境時，StrictMode 會導致 App render 兩次
// https://vitejs.dev/guide/env-and-mode.html
root.render(
  import.meta.env.DEV ? (
    <Renderer />
  ) : (
    <StrictMode>
      <Renderer />
    </StrictMode>
  )
);
