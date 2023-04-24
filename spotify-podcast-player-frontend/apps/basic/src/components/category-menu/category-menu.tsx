import { forwardRef, ReactNode, MouseEvent } from 'react';
import { Emoji } from 'emoji-picker-react';
import classNames from 'classnames';
import Dropdown from 'react-bootstrap/Dropdown';

import { useCategoryContext } from '../../contexts';
import { splitCategoryName } from '../../util';
import { ReactComponent as MoreVertIcon } from '../../assets/more-vert.svg';

import styles from './category-menu.module.scss';

/* eslint-disable-next-line */
export interface CategoryMenuProps {}

export interface CategoryItemProps extends Category {}

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

export function CategoryItem({id, name}: CategoryItemProps) {
  const categoryName = splitCategoryName(name);
  
  return (
    <div className={classNames('category-item', styles['item-container'])}>
      <div className={styles['name']}>
        <Emoji unified={categoryName.emoji || '1f423'} size={20} />
        <div className={styles['text']}>{categoryName.text}</div>
      </div>
      <Dropdown drop="down-centered">
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu className={styles['menu']}>
          <Dropdown.Item className={styles['menu-item']} onClick={() => {}}>
            編輯名稱
          </Dropdown.Item>
          <Dropdown.Item className={styles['menu-item']} onClick={() => {}}>
            刪除分類
          </Dropdown.Item>
          <Dropdown.Item className={styles['menu-item']} onClick={() => {}}>
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
