import type { Meta } from '@storybook/react';
import { AppProvider, useAppContext, ModalMap } from '../../contexts/app';
import { CategoryRemovePrompt } from './category-remove-prompt';

const Wrapper = (props: { categoryName: string }) => {
  const { openModal } = useAppContext();

  return (
    <div>
      <button onClick={() => openModal(ModalMap.CategoryRemovePrompt)}>
        Show CategoryRemovePrompt
      </button>
      <CategoryRemovePrompt
        categoryName={props.categoryName}
        onDelete={() => alert('Delete')}
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
  title: 'Modal/CategoryRemovePrompt',
};
export default Story;

export const Default = {
  args: {
    categoryName: '1f423:我的 Podcast',
  },
};
