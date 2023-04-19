import { Emoji } from 'emoji-picker-react';
import Modal from '../modal/modal';
import { useAppContext, ModalMap } from '../../contexts/app';
import { CategoryName, mergeCategoryName, splitCategoryName } from '../../util';

import styles from './category-remove-prompt.module.scss';

/* eslint-disable-next-line */
export interface CategoryRemovePromptProps {
  categoryName: string;
  onDelete: () => void;
}

export function CategoryRemovePrompt(props: CategoryRemovePromptProps) {
  const { modal, closeModal } = useAppContext();

  const categoryName = splitCategoryName(props.categoryName);

  const handleDelete = () => {
    closeModal();
    props.onDelete();
  };

  const buttons = [
    {
      variant: 'none',
      children: '取消',
      onClick: closeModal,
    },
    {
      variant: 'primary',
      children: '刪除',
      onClick: handleDelete,
    },
  ];

  return (
    <Modal
      title="刪除分類"
      show={modal === ModalMap.CategoryRemovePrompt}
      buttonProps={buttons}
      onClose={closeModal}
    >
      <div className={styles['modal-container']}>
        <span>
          您確定要繼續刪除&nbsp;
          <Emoji unified={categoryName.emoji} size={24} />
          &nbsp;<span className={styles['text']}>{categoryName.text}</span>
          &nbsp;分類嗎？
        </span>
      </div>
    </Modal>
  );
}

export default CategoryRemovePrompt;
