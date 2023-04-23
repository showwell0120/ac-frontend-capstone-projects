// TODO: useReducer refactoring

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

export interface CategoryProps {
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
}

export const CategoryContext = createContext<CategoryProps>({
  categories: [],
  setCategories: () => {},
});

export const useCategoryContext = () => useContext(CategoryContext);

export const useCategoryProviderState = (): CategoryProps => {
  const [categories, setCategories] = useState<Category[]>([]);
  return {
    categories,
    setCategories,
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
