import { useState } from 'react';
import type { Meta } from '@storybook/react';
import Modal, { ModalProps } from './modal';

const ModalInstance = (props: Omit<ModalProps, 'show' | 'onClose'>) => {
  const [show, setShow] = useState(true);

  return (
    <div
      style={{
        height: '100vh',
        backgroundSize: 'cover',
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2018/04/05/14/09/sunflowers-3292932_960_720.jpg')",
      }}
    >
      <Modal show={show} onClose={() => setShow(false)} {...props}></Modal>
    </div>
  );
};

const Story: Meta<typeof ModalInstance> = {
  component: ModalInstance,
  title: 'Modal/Base',
};
export default Story;

export const Simple = {
  args: {
    children: <div>Hello World</div>,
  },
};

export const HasTitle = {
  args: {
    title: 'Title',
    children: <div>Hello World</div>,
  },
};

export const HasButtons = {
  args: {
    title: 'Title',
    children: <div>Hello World</div>,
    buttonProps: [
      {
        variant: 'none',
        children: '取消',
        onClick: () => alert('cancel'),
      },
      { variant: 'primary', children: '確認', onClick: () => alert('submit') },
    ],
  },
};
