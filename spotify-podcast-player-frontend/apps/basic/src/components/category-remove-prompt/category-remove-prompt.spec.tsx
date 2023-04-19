import { render } from '@testing-library/react';

import CategoryRemovePrompt from './category-remove-prompt';

describe('CategoryRemovePrompt', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CategoryRemovePrompt />);
    expect(baseElement).toBeTruthy();
  });
});
