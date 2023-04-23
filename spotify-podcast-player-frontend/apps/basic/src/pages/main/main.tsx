import LoggedInLayout from '../../layouts/logged-in-layout';
import styles from './main.module.scss';

/* eslint-disable-next-line */
export interface MainProps {}

export function Main(props: MainProps) {
  return (
    <LoggedInLayout>
      <div className={styles['container']}>
        <h1>Welcome to Main!</h1>
      </div>
    </LoggedInLayout>
  );
}

export default Main;
