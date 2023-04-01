import { Route, Routes, Link } from 'react-router-dom';

import { Login } from '../pages';
import Callback from './callback';

import styles from './app.module.scss';

export function App() {
  return (
    <>
      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route path="/" element={<Login />} />
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
