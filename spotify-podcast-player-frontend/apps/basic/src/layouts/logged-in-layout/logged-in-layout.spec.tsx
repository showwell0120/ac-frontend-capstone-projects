import { render } from '@testing-library/react';

import LoggedInLayout from '.';

describe('LoggedInLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoggedInLayout />);
    expect(baseElement).toBeTruthy();
  });
});
