import { render } from '@testing-library/react';

import EpisodePlayer from './episode-player';

describe('EpisodePlayer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EpisodePlayer />);
    expect(baseElement).toBeTruthy();
  });
});
