import { render } from '@testing-library/react';

import ShowFinder from './show-finder';

describe('ShowFinder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShowFinder />);
    expect(baseElement).toBeTruthy();
  });
});
