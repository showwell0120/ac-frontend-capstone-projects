import { AxiosError } from 'axios';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query';

import FallbackRender from '../components/fallback-render/fallback-render';
import { Login, Callback, Main, Favorites } from '../pages';
import {
  useUserContext,
  UserProvider,
  FavoriteProvider,
  ModalProvider,
  CategoryProvider,
  PlayerProvider
} from '../contexts';

import styles from './app.module.scss';

// Create a client
const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      const response = error as AxiosError;
      console.log(response);
    },
  }),
  queryCache: new QueryCache({
    onError: (error) => {
      const response = error as AxiosError;
      console.log(response.code);
    },
  }),
});

function ProtectedRoute({ redirectPath = '/' }) {
  const { user, spotifyTokenInfo } = useUserContext();

  if (!user && !spotifyTokenInfo) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}

export function App() {
  return (
    <ErrorBoundary fallbackRender={FallbackRender}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CategoryProvider>
            <FavoriteProvider>
              <PlayerProvider>
                <ModalProvider>
                  <Routes>
                    <Route path="/callback" element={<Callback />} />
                    <Route path="/" element={<Login />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="/main" element={<Main />} />
                      <Route path="/favorites" element={<Favorites />} />
                    </Route>
                  </Routes>
                </ModalProvider>
              </PlayerProvider>
            </FavoriteProvider>
          </CategoryProvider>
        </UserProvider>
      </QueryClientProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </ErrorBoundary>
  );
}

export default App;
