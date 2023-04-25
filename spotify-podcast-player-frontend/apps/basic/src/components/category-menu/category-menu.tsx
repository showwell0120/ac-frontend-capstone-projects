import { forwardRef, ReactNode, MouseEvent } from 'react';
import { Emoji } from 'emoji-picker-react';
import classNames from 'classnames';
import Dropdown from 'react-bootstrap/Dropdown';

import {
  useCategoryContext,
  useModalContext,
  modalTypes,
} from '../../contexts';
import { splitCategoryName } from '../../util';
import { ReactComponent as MoreVertIcon } from '../../assets/more-vert.svg';

import styles from './category-menu.module.scss';

/* eslint-disable-next-line */
export interface CategoryMenuProps {}

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    onClick: (e: MouseEvent<HTMLDivElement>) => void;
  }
>(({ onClick }, ref) => (
  <div
    className={styles['wrapper']}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <MoreVertIcon width={20} height={20} />
  </div>
));

export function CategoryItem({ id, name }: Category) {
  const { currentCategoryId, setCurrentCategoryId } = useCategoryContext();
  const { showModal } = useModalContext();

  const categoryName = splitCategoryName(name);

  const handleEditName = () => {
    showModal(modalTypes.CategoryNameEditor, {
      id,
      title: '編輯分類名稱',
      categoryName: name,
      onSubmit: (success: boolean) => console.log(success),
    });
  };

  const handleDeleteCategory = () => {
    showModal(modalTypes.CategoryRemovePrompt, {
      id,
      categoryName: name,
      onDelete: (success: boolean) => console.log(success),
    });
  };

  const handleAddShow = () => {
    showModal(modalTypes.ShowFinder);
  };

  const handleChangeCurrCategory = () => {
    currentCategoryId !== id && setCurrentCategoryId(id);
  };

  return (
    <div
      className={classNames(
        'category-item',
        styles['item-container'],
        currentCategoryId === id && 'active'
      )}
      onClick={handleChangeCurrCategory}
    >
      <div className={styles['name']}>
        <Emoji unified={categoryName.emoji || '1f423'} size={20} />
        <div className={styles['text']}>{categoryName.text}</div>
      </div>
      <Dropdown drop="down-centered">
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu className={styles['menu']}>
          <Dropdown.Item
            className={styles['menu-item']}
            onClick={handleEditName}
          >
            編輯名稱
          </Dropdown.Item>
          <Dropdown.Item
            className={styles['menu-item']}
            onClick={handleDeleteCategory}
          >
            刪除分類
          </Dropdown.Item>
          <Dropdown.Item
            className={styles['menu-item']}
            onClick={handleAddShow}
          >
            新增節目
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export function CategoryMenu(props: CategoryMenuProps) {
  const { categories } = useCategoryContext();

  if (!categories?.length) {
    return null;
  }

  return (
    <div className={styles['container']}>
      {categories.map((category) => (
        <CategoryItem key={`${category.id}`} {...category} />
      ))}
    </div>
  );
}

export default CategoryMenu;
