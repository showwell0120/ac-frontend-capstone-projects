import type { Meta } from '@storybook/react';

import { AppProvider } from '../../contexts/app';
import CreateCategoryButton from './create-category-button';

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
