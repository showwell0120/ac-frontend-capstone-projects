// TODO: useReducer refactoring
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

import {fetchCategories} from '../apis/backend-api'

export interface CategoryContextProps {
  categories: Category[];
  currentCategoryId: string | null;
  setCategories: Dispatch<SetStateAction<Category[]>>;
  setCurrentCategoryId: Dispatch<SetStateAction<string | null>>;
  syncCategories?: UseMutationResult<Categories, unknown, void, unknown>;
}

export const CategoryContext = createContext<CategoryContextProps>({
  categories: [],
  currentCategoryId: null,
  setCategories: () => null,
  setCurrentCategoryId: () => null,
});

export const useCategoryContext = () => useContext(CategoryContext);

export const useCategoryProviderState = (): CategoryContextProps => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(
    null
  );

  const syncCategories = useMutation({ mutationFn: fetchCategories });

  return {
    categories,
    currentCategoryId,
    setCategories,
    setCurrentCategoryId,
    syncCategories,
  };
};

export const CategoryProvider = (props: { children: ReactNode }) => {
  const categoryContextValue = useCategoryProviderState();

  return (
    <CategoryContext.Provider value={categoryContextValue}>
      {props.children}
    </CategoryContext.Provider>
  );
};
