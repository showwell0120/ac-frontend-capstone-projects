import { render } from '@testing-library/react';

import CreateShowButton from '.';

describe('CreateShowButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateShowButton />);
    expect(baseElement).toBeTruthy();
  });
});
