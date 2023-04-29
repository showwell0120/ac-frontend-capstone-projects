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

interface SyncCategoriesEvents {
  onSettled: () => void;
}

export interface CategoryContextProps {
  categories: Category[];
  currentCategoryId: string | null;
  setCategories: Dispatch<SetStateAction<Category[]>>;
  setCurrentCategoryId: Dispatch<SetStateAction<string | null>>;
  syncCategories: (events?: SyncCategoriesEvents) => void;
  syncCategoriesMutation: UseMutationResult<Categories, unknown, void, unknown> | null;
}

export const CategoryContext = createContext<CategoryContextProps>({
  categories: [],
  currentCategoryId: null,
  setCategories: () => null,
  setCurrentCategoryId: () => null,
  syncCategories: () => null,
  syncCategoriesMutation: null,
});

export const useCategoryContext = () => useContext(CategoryContext);

export const useCategoryProviderState = (): CategoryContextProps => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(
    null
  );

  const syncCategoriesMutation = useMutation({ mutationFn: fetchCategories });

  // error handling: fallback rendering
  if (syncCategoriesMutation.isError) {
    throw syncCategoriesMutation.error;
  }

  const syncCategories = (events?: SyncCategoriesEvents) => {
    syncCategoriesMutation.mutate(undefined, {
      onSuccess: (data) => {
        setCategories(data.categories);
        data.categories.length &&
          !currentCategoryId &&
          setCurrentCategoryId(data.categories[0].id);
      },
      onSettled: () => {
        events?.onSettled && events.onSettled();
      },
    });
  };

  return {
    categories,
    currentCategoryId,
    setCategories,
    setCurrentCategoryId,
    syncCategories,
    syncCategoriesMutation,
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
