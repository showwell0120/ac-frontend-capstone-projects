import { render } from '@testing-library/react';

import CreateCategoryButton from '.';

describe('CreateCategoryButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateCategoryButton />);
    expect(baseElement).toBeTruthy();
  });
});
