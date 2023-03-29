// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { Route, Routes, Link } from 'react-router-dom';

import { Button } from '@spotify-podcast-player-frontend/common-ui';
import { redirectToAuthCodeFlow } from '@spotify-podcast-player-frontend/spotify-api';

import Callback from './callback';

export function App() {
  return (
    <>
      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route
          path="/"
          element={
            <div>
              <Button
                onClick={redirectToAuthCodeFlow}
                text="Login with Spotify"
              />
            </div>
          }
        />
        <Route
          path="/main"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </>
  );
}

export default App;
