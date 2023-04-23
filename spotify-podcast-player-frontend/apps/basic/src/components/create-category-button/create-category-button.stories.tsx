import type { Meta } from '@storybook/react';

import { AppProvider } from '../../contexts/app';
import CreateCategoryButton from '.';

const App = () => {
  return (
    <AppProvider>
      <CreateCategoryButton />
    </AppProvider>
  );
};

const Story: Meta<typeof App> = {
  component: App,
  title: 'CreateCategoryButton',
};
export default Story;

export const Default = {
  args: {},
};
