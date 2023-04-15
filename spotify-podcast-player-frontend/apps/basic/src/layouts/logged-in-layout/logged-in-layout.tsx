import styles from './logged-in-layout.module.scss';

/* eslint-disable-next-line */
export interface LoggedInLayoutProps {}

export function LoggedInLayout(props: LoggedInLayoutProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to LoggedInLayout!</h1>
    </div>
  );
}

export default LoggedInLayout;
