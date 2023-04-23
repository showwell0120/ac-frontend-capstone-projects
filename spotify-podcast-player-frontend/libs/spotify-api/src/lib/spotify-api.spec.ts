import { spotifyApi } from './spotify-api';

describe('spotifyApi', () => {
  it('should work', () => {
    expect(spotifyApi()).toEqual('spotify-api');
  });
});
