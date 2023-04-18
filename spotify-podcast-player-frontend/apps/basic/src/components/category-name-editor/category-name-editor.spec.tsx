import { render } from '@testing-library/react';

import CategoryNameEditor from './category-name-editor';

describe('CategoryNameEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CategoryNameEditor
        categoryName={{ emoji: '', text: '' }}
        onChange={() => {}}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
