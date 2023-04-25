import type { Meta } from '@storybook/react';

import { ModalProvider } from '../../contexts/modal';
import ShowCard from './show-card';

const App = () => {
  return (
    <ModalProvider>
      <ShowCard
        name="BBC World News"
        publisher="BBC World Service"
        id="1"
        images={[
          {
            url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
            height: 300,
            width: 300,
          },
        ]}
      />
    </ModalProvider>
  );
};

const Story: Meta<typeof App> = {
  component: App,
  title: 'ShowCard',
};
export default Story;

export const Default = {
  args: {},
};
