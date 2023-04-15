import { render } from '@testing-library/react';

import CategoryMenu from './category-menu';

describe('CategoryMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CategoryMenu />);
    expect(baseElement).toBeTruthy();
  });
});
