import styles from './user-menu.module.scss';

/* eslint-disable-next-line */
export interface UserMenuProps {}

export function UserMenu(props: UserMenuProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to UserMenu!</h1>
    </div>
  );
}

export default UserMenu;
