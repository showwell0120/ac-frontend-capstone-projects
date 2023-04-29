import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from '@tanstack/react-query';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';

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
  queryCache: new QueryCache({
    onError: (error, query) => {},
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
    // Provide the client to your App
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
  );
}

export default App;
