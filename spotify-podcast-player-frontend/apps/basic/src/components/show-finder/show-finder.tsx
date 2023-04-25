import styles from './show-finder.module.scss';

/* eslint-disable-next-line */
export interface ShowFinderProps {}

export function ShowFinder(props: ShowFinderProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ShowFinder!</h1>
    </div>
  );
}

export default ShowFinder;
