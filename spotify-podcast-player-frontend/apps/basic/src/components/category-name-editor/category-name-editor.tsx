import { useState, ChangeEvent } from 'react';
import classNames from 'classnames';
import EmojiPicker, { EmojiClickData, Emoji } from 'emoji-picker-react';
import { useMutation } from '@tanstack/react-query';
import Spinner from 'react-bootstrap/Spinner';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { useModalContext, useCategoryContext } from '../../contexts';
import { createCategory, updateCategory } from '../../apis/backend-api';
import Modal from '../modal/modal';
import { CategoryName, mergeCategoryName, splitCategoryName } from '../../util';
import { shouldFallback } from '../fallback-render/fallback-render';

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
  id?: string;
  onSubmit: (success: boolean) => void;
}

export function CategoryNameEditorModal(props: CategoryNameEditorModalProps) {
  const { hideModal } = useModalContext();
  const { syncCategories, syncCategoriesMutation } = useCategoryContext();

  const _createCategory = useMutation({ mutationFn: createCategory });
  const _updateCategory = useMutation({ mutationFn: updateCategory });

  // error handling: fallback rendering or other actions
  if (_createCategory.isError) {
    const error = _createCategory.error as AxiosError;
    if (shouldFallback(error)) {
      throw error;
    } else if (error?.response?.status === 409) {
      toast('已存在相同名稱的分類');
    }
  }

  // error handling: fallback rendering or other actions
  if (_updateCategory.isError) {
    const error = _updateCategory.error as AxiosError;
    if (shouldFallback(error)) {
      throw error;
    } else if (error?.response?.status === 409) {
      toast('已存在相同名稱的分類');
    }
  }

  const [categoryName, setCategoryName] = useState<CategoryName>(
    splitCategoryName(props.categoryName)
  );

  const handleChange = (value: string, field: keyof CategoryName) =>
    setCategoryName((prevState) => ({ ...prevState, [field]: value }));

  const updateNameCallback = {
    onSuccess: (data: SuccessResponse) => {
      syncCategories({ onSettled: hideModal });
      props.onSubmit(data.success);
    },
  };

  const handleSave = async () => {
    const finalName = mergeCategoryName(categoryName);
    props?.id
      ? _updateCategory.mutate(
          { name: finalName, id: props.id },
          updateNameCallback
        )
      : _createCategory.mutate(finalName, updateNameCallback);
  };

  const buttons = [
    {
      variant: 'none',
      children: '取消',
      onClick: hideModal,
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
      show={true}
      buttonProps={buttons}
      onClose={hideModal}
    >
      <div className={styles['modal-container']}>
        {_createCategory.isLoading || syncCategoriesMutation?.isLoading ? (
          <Spinner
            animation="border"
            role="status"
            className={styles['spinner']}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <CategoryNameEditor
            categoryName={categoryName}
            onChange={handleChange}
          />
        )}
      </div>
    </Modal>
  );
}

export default CategoryNameEditor;
