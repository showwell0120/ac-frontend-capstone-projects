import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache
} from '@tanstack/react-query';

import App from './app/app';
import './styles.scss';

// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { AxiosError } from 'axios';

if (import.meta.env.DEV && import.meta.env.MODE === 'dev-mock-api') {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { worker } = await import('./mocks/browser');
  worker.start();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// // Create a client
// const queryClient = new QueryClient({
//   mutationCache: new MutationCache({
//     onError: (error) => {
//       const response = error as AxiosError;
//       console.log(response);
//       throw response;
//     },
//   }),
//   queryCache: new QueryCache({
//     onError: (error) => {
//       const response = error as Response;
//       console.log(response);
//     },
//   }),
// });

const Renderer = () => (
  <BrowserRouter>
    {/* <QueryClientProvider client={queryClient}> */}
      <App />
    {/* </QueryClientProvider> */}
  </BrowserRouter>
);

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
