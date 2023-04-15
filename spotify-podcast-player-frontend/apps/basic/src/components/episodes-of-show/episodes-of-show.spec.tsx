import { render } from '@testing-library/react';

import EpisodesOfShow from './episodes-of-show';

describe('EpisodesOfShow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EpisodesOfShow />);
    expect(baseElement).toBeTruthy();
  });
});
