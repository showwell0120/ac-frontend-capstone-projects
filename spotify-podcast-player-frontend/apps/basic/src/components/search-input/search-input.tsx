import { ChangeEvent, useState, useEffect } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';

import styles from './search-input.module.scss';

/* eslint-disable-next-line */
export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  debounceDelay?: number;
}

export function SearchInput({
  value,
  onChange,
  debounceDelay = 500,
}: SearchInputProps) {
  const [searchValue, setSearchValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue !== value) {
        onChange(searchValue);
      }
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, value, onChange, debounceDelay]);

  return (
    <div className="input-container">
      <SearchIcon />
      <input
        className="text-input"
        type="text"
        placeholder="開始搜尋 ..."
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchInput;
