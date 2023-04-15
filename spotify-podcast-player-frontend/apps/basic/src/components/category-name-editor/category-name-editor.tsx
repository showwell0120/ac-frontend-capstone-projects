import styles from './category-name-editor.module.scss';

/* eslint-disable-next-line */
export interface CategoryNameEditorProps {}

export function CategoryNameEditor(props: CategoryNameEditorProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CategoryNameEditor!</h1>
    </div>
  );
}

export default CategoryNameEditor;
