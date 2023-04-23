import { useAppContext, ModalMap } from '../../contexts/app';
import { CategoryNameEditorModal } from '../category-name-editor/category-name-editor';
import { ReactComponent as PlusIcon } from '../../assets/plus.svg';

import styles from './create-category-button.module.scss';

/* eslint-disable-next-line */
export interface CreateCategoryButtonProps {}

export function CreateCategoryButton(props: CreateCategoryButtonProps) {
  const { openModal } = useAppContext();

  const handleOpenModal = () => openModal(ModalMap.CategoryNameEditor);

  return (
    <>
      <div className={styles['container']} onClick={handleOpenModal}>
        <PlusIcon />
        <span>新增分類</span>
      </div>
      <CategoryNameEditorModal
        title="新增分類"
        categoryName=""
        onSubmit={(name) => alert(name)}
      />
    </>
  );
}

export default CreateCategoryButton;
