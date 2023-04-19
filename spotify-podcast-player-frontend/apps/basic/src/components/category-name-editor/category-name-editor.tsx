import { useState, ChangeEvent } from 'react';
import classNames from 'classnames';
import EmojiPicker, { EmojiClickData, Emoji } from 'emoji-picker-react';

import Modal from '../modal/modal';
import { useAppContext, ModalMap } from '../../contexts/app';
import { CategoryName, mergeCategoryName, splitCategoryName } from '../../util';

import styles from './category-name-editor.module.scss';

/* eslint-disable-next-line */
export interface CategoryNameEditorProps {
  categoryName: CategoryName;
  onChange: (value: string, field: keyof CategoryName) => void;
}

export function CategoryNameEditor(props: CategoryNameEditorProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiChange = (emojiData: EmojiClickData) => {
    props.onChange(emojiData.unified, 'emoji');
    setShowEmojiPicker(false);
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value, 'text');
  };

  return (
    <div className="input-container">
      <div
        className="position-relative"
        onClick={() => setShowEmojiPicker((preState) => !preState)}
      >
        <div className={styles['emoji-wrapper']}>
          <Emoji unified={props.categoryName.emoji || '1f423'} size={24} />
        </div>
        <div
          className={classNames('position-absolute', styles['emoji-picker'])}
        >
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiClick={handleEmojiChange}
              searchDisabled
              skinTonesDisabled
              height={240}
              previewConfig={{ showPreview: false }}
            />
          )}
        </div>
      </div>
      <input
        className="text-input"
        type="text"
        placeholder="請輸入分類名稱（前方可變更 emoji）"
        value={props.categoryName.text}
        onChange={handleTextChange}
      />
    </div>
  );
}

export interface CategoryNameEditorModalProps {
  title: string;
  categoryName: string;
  onSubmit: (categoryName: string) => void;
}

export function CategoryNameEditorModal(props: CategoryNameEditorModalProps) {
  const { modal, closeModal } = useAppContext();
  const [categoryName, setCategoryName] = useState<CategoryName>(
    splitCategoryName(props.categoryName)
  );

  const handleChange = (value: string, field: keyof CategoryName) =>
    setCategoryName((prevState) => ({ ...prevState, [field]: value }));

  const handleSave = () => {
    closeModal();
    props.onSubmit(mergeCategoryName(categoryName));
  };

  const buttons = [
    {
      variant: 'none',
      children: '取消',
      onClick: closeModal,
    },
    {
      variant: 'primary',
      children: '儲存',
      onClick: handleSave,
    },
  ];

  return (
    <Modal
      title={props.title}
      show={modal === ModalMap.CategoryNameEditor}
      buttonProps={buttons}
      onClose={closeModal}
    >
      <div className={styles['modal-container']}>
        <CategoryNameEditor
          categoryName={categoryName}
          onChange={handleChange}
        />
      </div>
    </Modal>
  );
}

export default CategoryNameEditor;
