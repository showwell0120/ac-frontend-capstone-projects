import { forwardRef, MouseEvent, ReactNode } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import { useUserContext } from '../../contexts';
import { ReactComponent as DownIcon } from '../../assets/chevron-down.svg';

import styles from './user-dropdown.module.scss';

/* eslint-disable-next-line */
export interface UserDropdownProps {}

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    onClick: (e: MouseEvent<HTMLDivElement>) => void;
  }
>(({ children, onClick }, ref) => (
  <div
    className={styles['wrapper']}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <DownIcon />
  </div>
));

export function UserDropdown(props: UserDropdownProps) {
  const { spotifyUser } = useUserContext();

  if (!spotifyUser) {
    return null;
  }

  const handleNavigate = () => {};

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <div>
          <img
            className={styles['avatar']}
            src={spotifyUser.images[0].url}
            alt={spotifyUser.display_name}
          />
          <span>{spotifyUser.display_name}</span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleNavigate}>查看我的個人資訊</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropdown;
