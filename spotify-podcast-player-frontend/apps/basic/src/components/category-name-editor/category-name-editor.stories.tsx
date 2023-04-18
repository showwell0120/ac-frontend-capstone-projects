import type { Meta } from '@storybook/react';
import { AppProvider, useAppContext, ModalMap } from '../../contexts/app';
import { CategoryNameEditorModal } from './category-name-editor';

const Wrapper = (props: { categoryName: string; title: string }) => {
  const { openModal } = useAppContext();

  return (
    <div>
      <button onClick={() => openModal(ModalMap.CategoryNameEditor)}>
        Show CategoryNameEditorModal
      </button>
      <CategoryNameEditorModal
        title={props.title}
        categoryName={props.categoryName}
        onSubmit={(name) => alert(name)}
      />
    </div>
  );
};

const App = (props: { categoryName: string; title: string }) => {
  return (
    <AppProvider>
      <Wrapper {...props} />
    </AppProvider>
  );
};

const Story: Meta<typeof App> = {
  component: App,
  title: 'Modal/CategoryNameEditor',
};
export default Story;

export const CreateCategory = {
  args: {
    categoryName: '',
    title: '新增分類',
  },
};

export const EditCategoryName = {
  args: {
    categoryName: '1f423:我的 Podcast',
    title: '編輯分類名稱',
  },
};
