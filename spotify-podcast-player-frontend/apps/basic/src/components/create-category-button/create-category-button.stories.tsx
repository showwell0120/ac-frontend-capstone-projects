import type { Meta } from '@storybook/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { ModalProvider } from '../../contexts/modal';
import CreateCategoryButton from '.';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ModalProvider>
      <CreateCategoryButton />
    </ModalProvider>
  );
};

const Story: Meta<typeof App> = {
  component: App,
  title: 'CreateCategoryButton',
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    ),
  ],
};
export default Story;

export const Default = {
  args: {},
};
