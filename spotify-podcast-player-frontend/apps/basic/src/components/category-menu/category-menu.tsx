import styles from './category-menu.module.scss';

/* eslint-disable-next-line */
export interface CategoryMenuProps {}

export function CategoryMenu(props: CategoryMenuProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CategoryMenu!</h1>
    </div>
  );
}

export default CategoryMenu;
