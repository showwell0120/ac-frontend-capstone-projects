import { ChangeEvent } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';

import styles from './search-input.module.scss';

/* eslint-disable-next-line */
export interface SearchInputProps {
  text: string;
  onChange: (text: string) => void;
}

export function SearchInput(props: SearchInputProps) {
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
  };

  return (
    <div className="input-container">
      <SearchIcon />
      <input
        className="text-input"
        type="text"
        placeholder="開始搜尋 ..."
        value={props.text}
        onChange={handleTextChange}
      />
    </div>
  );
}

export default SearchInput;
