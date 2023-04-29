import { ReactNode } from 'react';
import classNames from 'classnames';
import { Emoji } from 'emoji-picker-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import CreateCategoryButton from '../../components/create-category-button';
import UserDropdown from '../../components/user-dropdown/user-dropdown';
import { CategoryMenu } from '../../components/category-menu/category-menu';
import { getGreeting } from '../../util';
import { useCategoryContext } from '../../contexts'

import styles from './logged-in-layout.module.scss';

/* eslint-disable-next-line */
export interface LoggedInLayoutProps {
  children: ReactNode;
}

export function Sider() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { setCurrentCategoryId } = useCategoryContext();

  const handleNavigate = () => {
    setCurrentCategoryId(null);
    navigate('/favorites');
  };

  const isFavPath = pathname.includes('/favorites');

  return (
    <div className={styles['sidenav-container']}>
      <img className="d-block w-100" src="./images/logo.png" alt="logo" />
      <div className={styles['divider']}></div>
      <div className="mt-5">
        <CategoryMenu />
      </div>
      <div
        className={classNames('category-item', isFavPath && 'active')}
        onClick={handleNavigate}
      >
        <div className={'name'}>
          <Emoji unified={'1f496'} size={20} />
          <div className={'text'}>已收藏</div>
        </div>
      </div>
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
