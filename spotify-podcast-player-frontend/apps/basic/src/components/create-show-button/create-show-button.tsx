import { Button } from 'react-bootstrap';
import classNames from 'classnames';
import { ReactComponent as EmptyFolderIcon } from '../../assets/empty-folder.svg';
import { flexColCenter } from '../../bootstrap-classnames';
import styles from './create-show-button.module.scss';

/* eslint-disable-next-line */
export interface CreateShowButtonProps {}

export function CreateShowButton(props: CreateShowButtonProps) {
  return (
    <div className={classNames(flexColCenter, styles['container'])}>
      <EmptyFolderIcon height={56} width={56} />
      <div>您尚未加入任何節目，可以點擊按鈕新增！</div>
      <Button variant="primary" className={styles['button']}>
        新增節目
      </Button>
    </div>
  );
}

export default CreateShowButton;
