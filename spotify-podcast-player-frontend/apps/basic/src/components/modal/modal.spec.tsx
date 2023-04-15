import { render } from '@testing-library/react';

import Modal from './modal';

describe('Modal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Modal show={true} onClose={() => {}}>
        Hello Modal
      </Modal>
    );
    expect(baseElement).toBeTruthy();
  });
});
