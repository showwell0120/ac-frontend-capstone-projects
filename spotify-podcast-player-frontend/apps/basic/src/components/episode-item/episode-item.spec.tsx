import { render } from '@testing-library/react';

import EpisodeItem from './episode-item';

describe('EpisodeItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EpisodeItem />);
    expect(baseElement).toBeTruthy();
  });
});
