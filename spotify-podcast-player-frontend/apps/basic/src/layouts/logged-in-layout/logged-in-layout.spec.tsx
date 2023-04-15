import { render } from '@testing-library/react';

import LoggedInLayout from './logged-in-layout';

describe('LoggedInLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoggedInLayout />);
    expect(baseElement).toBeTruthy();
  });
});
