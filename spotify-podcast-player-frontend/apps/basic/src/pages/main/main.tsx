import LoggedInLayout from '../../layouts/logged-in-layout/logged-in-layout';
import NoDataView from '../../components/no-data-view/no-data-view';
import { useCategoryContext } from '../../contexts';

import styles from './main.module.scss';

/* eslint-disable-next-line */
export interface MainProps {}

export function Main(props: MainProps) {
  const { currentCategoryId } = useCategoryContext();

  return (
    <LoggedInLayout>
      <div className={styles['container']}>
        {!currentCategoryId && <NoDataView type={'category'} />}
      </div>
    </LoggedInLayout>
  );
}

export default Main;
