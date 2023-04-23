interface SpotifyTokenInfo {
  access_token: string | null;
  expires_in: number | null;
  refresh_token: string | null;
  scope: string | null;
  token_type: string | null;
}

type Images = {
  url: string;
  height: number;
  width: number;
}[];

interface SpotifyCommonFields {
  description: string;
  html_description: string;
  explicit: false;
  external_urls: Record<string, string>;
  href: string;
  id: string;
  images: Images;
  is_externally_hosted: boolean;
  languages: string;
  name: string;
  type: 'episode' | 'show';
  uri: string;
}

interface SpotifyUser {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: false;
    filter_locked: false;
  };
  external_urls: Record<string, string>;
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: Images;
  product: string;
  type: string;
  uri: string;
}

interface SpotifyShow extends SpotifyCommonFields {
  available_markets: string[];
  copyrights: {
    text: string;
    type: string;
  }[];
  media_type: string;
  publisher: string;
  total_episodes: number;
  episodes: Omit<Episode, 'show'>[];
}

interface SpotifyEpisode extends SpotifyCommonFields {
  audio_preview_url: string;
  duration_ms: number;
  is_playable: boolean;
  language: string;
  release_date: string;
  release_date_precision: string;
  resume_point: {
    fully_played: boolean;
    resume_position_ms: number;
  };
  restrictions: Record<string, string>;
  show: Omit<Show, 'episodes'>;
}
