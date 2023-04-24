import { useModalContext, modalTypes } from '../../contexts/modal';
import { ReactComponent as PlusIcon } from '../../assets/plus.svg';

import styles from './create-category-button.module.scss';

/* eslint-disable-next-line */
export interface CreateCategoryButtonProps {}

export function CreateCategoryButton(props: CreateCategoryButtonProps) {
  const { showModal } = useModalContext();

  const handleOpenModal = () =>
    showModal(modalTypes.CategoryNameEditor, {
      title: '新增分類',
      categoryName: '',
      onSubmit(categoryName: string) {
        console.log(categoryName);
      },
    });

  return (
    <div className={styles['container']} onClick={handleOpenModal}>
      <PlusIcon />
      <span>新增分類</span>
    </div>
  );
}

export default CreateCategoryButton;
