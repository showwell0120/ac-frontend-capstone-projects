import type { Meta } from '@storybook/react';
import NoDataView from '.';

const Story: Meta<typeof NoDataView> = {
  component: NoDataView,
  title: 'NoDataView',
};
export default Story;

export const Show = {
  args: {
    type: 'show',
    onClick: () => {},
  },
};

export const Category = {
  args: {
    type: 'category',
  },
};
