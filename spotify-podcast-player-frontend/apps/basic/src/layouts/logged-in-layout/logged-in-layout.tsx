import { ReactNode } from 'react';
import classNames from 'classnames';

import CreateCategoryButton from '../../components/create-category-button';
import UserDropdown from '../../components/user-menu/user-menu';
import { getGreeting } from '../../util';

import styles from './logged-in-layout.module.scss';

/* eslint-disable-next-line */
export interface LoggedInLayoutProps {
  children: ReactNode;
}

export function Sider() {
  return (
    <div className={styles['sidenav-container']}>
      <img className="d-block w-100" src="./images/logo.png" alt="logo" />
      <div className={styles['divider']}></div>
      <div></div>
      <div className="mt-3">
        <CreateCategoryButton />
      </div>
    </div>
  );
}

export function TopBar() {
  return (
    <div className={styles['topbar-container']}>
      <div className={styles['greeting']}>{getGreeting()}</div>
      <UserDropdown />
    </div>
  );
}

export function LoggedInLayout({ children }: LoggedInLayoutProps) {
  return (
    <div className={styles['container']}>
      <Sider />
      <div className={styles['content']}>
        <TopBar />
        {children}
      </div>
    </div>
  );
}

export default LoggedInLayout;
