import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';

import { Login, Callback, Main } from '../pages';
import { useUserContext, UserProvider } from '../contexts';

import styles from './app.module.scss';

// Create a client
const queryClient = new QueryClient();

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
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/callback" element={<Callback />} />
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/main" element={<Main />} />
          </Route>
        </Routes>
        {/* END: routes */}
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
