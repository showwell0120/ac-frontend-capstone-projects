import { render } from '@testing-library/react';

import ShowCard from './show-card';

describe('ShowCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShowCard />);
    expect(baseElement).toBeTruthy();
  });
});
