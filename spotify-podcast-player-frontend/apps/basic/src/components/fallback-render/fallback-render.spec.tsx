import { render } from '@testing-library/react';

import FallbackRender from './fallback-render';

describe('FallbackRender', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FallbackRender />);
    expect(baseElement).toBeTruthy();
  });
});
