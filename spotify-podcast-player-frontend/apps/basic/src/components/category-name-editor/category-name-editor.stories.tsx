import type { Meta } from '@storybook/react';
import { ModalProvider, useModalContext, modalTypes } from '../../contexts/modal';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();


const Wrapper = (props: { categoryName: string; title: string }) => {
  const { showModal } = useModalContext();

  return (
    <div>
      <button onClick={() => showModal(modalTypes.CategoryNameEditor)}>
        Show CategoryNameEditorModal
      </button>
    </div>
  );
};

const App = (props: { categoryName: string; title: string }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <Wrapper {...props} />
      </ModalProvider>
    </QueryClientProvider>
  );
};

export default {
  component: App,
  title: 'Modal/CategoryNameEditor',
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    ),
  ],
} as Meta<typeof App>;

const Template: Story = (args) => <App {...args} />;

export const CreateCategory = Template.bind({});

CreateCategory.args = {
  categoryName: '',
  title: '新增分類',
};

export const EditCategoryName = {
  args: {
    categoryName: '1f423:我的 Podcast',
    title: '編輯分類名稱',
  },
};
