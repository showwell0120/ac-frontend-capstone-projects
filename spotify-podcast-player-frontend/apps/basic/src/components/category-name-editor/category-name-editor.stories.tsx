import type { Meta } from '@storybook/react';
import { AppProvider, useAppContext, ModalMap } from '../../contexts/app';
import { CategoryNameEditorModal } from './category-name-editor';

const Wrapper = (props: { categoryName: string }) => {
  const { openModal } = useAppContext();

  return (
    <div>
      <button onClick={() => openModal(ModalMap.CategoryNameEditor)}>
        Show CategoryNameEditorModal
      </button>
      <CategoryNameEditorModal
        categoryName={props.categoryName}
        onSubmit={(name) => alert(name)}
      />
    </div>
  );
};

const App = (props: { categoryName: string }) => {
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

export const Empty = {
  args: {
    categoryName: '',
  },
};

export const HasDefaultValue = {
  args: {
    categoryName: '1f423:我的 Podcast',
  },
};
