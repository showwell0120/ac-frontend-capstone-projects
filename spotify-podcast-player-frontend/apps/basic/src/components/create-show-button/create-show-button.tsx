import styles from './create-show-button.module.scss';

/* eslint-disable-next-line */
export interface CreateShowButtonProps {}

export function CreateShowButton(props: CreateShowButtonProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CreateShowButton!</h1>
    </div>
  );
}

export default CreateShowButton;
