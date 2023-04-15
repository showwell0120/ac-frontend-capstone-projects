import styles from './create-category-button.module.scss';

/* eslint-disable-next-line */
export interface CreateCategoryButtonProps {}

export function CreateCategoryButton(props: CreateCategoryButtonProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CreateCategoryButton!</h1>
    </div>
  );
}

export default CreateCategoryButton;
