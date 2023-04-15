import React, { useState, useEffect } from 'react';
import type { Meta } from '@storybook/react';
import Modal, { ModalProps } from './modal';

const ModalInstance = (props: ModalProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => setShow(props.show), [props.show]);

  return (
    <div
      style={{
        height: '100vh',
        backgroundSize: 'cover',
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2018/04/05/14/09/sunflowers-3292932_960_720.jpg')",
      }}
    >
      <Modal show={show} onClose={() => setShow(false)}>
        {props.children}
      </Modal>
    </div>
  );
};

const Story: Meta<typeof ModalInstance> = {
  component: ModalInstance,
  title: 'Modal',
};
export default Story;

export const Primary = {
  args: {
    children: <div>Hello World</div>,
    show: true,
  },
};
