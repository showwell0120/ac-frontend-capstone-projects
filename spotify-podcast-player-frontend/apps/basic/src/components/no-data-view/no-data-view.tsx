import { Button } from 'react-bootstrap';
import classNames from 'classnames';

import { ReactComponent as EmptyFolderIcon } from '../../assets/empty-folder.svg';
import { flexColCenter } from '../../bootstrap-classnames';

import styles from './no-data-view.module.scss';

/* eslint-disable-next-line */
export interface NoDataViewProps {
  type: 'category' | 'show';
  onClick?: () => void;
}

const title = {
  category: '您尚未新增任何分類，可以點擊左方按鈕新增！',
  show: '您尚未加入任何節目，可以點擊下方按鈕新增！',
};

const button = {
  category: '新增分類',
  show: '新增節目',
};

export function NoDataView({ type, onClick }: NoDataViewProps) {
  return (
    <div className={classNames(flexColCenter, styles['container'])}>
      <EmptyFolderIcon height={56} width={56} />
      <div>{title[type]}</div>
      {onClick && (
        <Button
          variant="primary"
          className={styles['button']}
          onClick={onClick}
        >
          {button[type]}
        </Button>
      )}
    </div>
  );
}

export default NoDataView;
