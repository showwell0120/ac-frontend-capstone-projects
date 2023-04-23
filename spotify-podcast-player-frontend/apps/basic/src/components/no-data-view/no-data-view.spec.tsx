import { render } from '@testing-library/react';

import CreateShowButton from './no-data-view';

describe('CreateShowButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateShowButton />);
    expect(baseElement).toBeTruthy();
  });
});
