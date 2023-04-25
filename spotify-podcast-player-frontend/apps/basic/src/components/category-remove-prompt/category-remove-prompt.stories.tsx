import type { Meta } from '@storybook/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import {
  ModalProvider,
  useModalContext,
  modalTypes,
} from '../../contexts/modal';

const queryClient = new QueryClient();


const Wrapper = (props: { categoryName: string }) => {
  const { showModal } = useModalContext();

  return (
    <div>
      <button onClick={() => showModal(modalTypes.CategoryRemovePrompt)}>
        Show CategoryRemovePrompt
      </button>
    </div>
  );
};

const App = (props: { categoryName: string }) => {
  return (
    <ModalProvider>
      <Wrapper {...props} />
    </ModalProvider>
  );
};

const Story: Meta<typeof App> = {
  component: App,
  title: 'Modal/CategoryRemovePrompt',
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    ),
  ],
};
export default Story;

export const Default = {
  args: {
    categoryName: '1f423:我的 Podcast',
  },
};
