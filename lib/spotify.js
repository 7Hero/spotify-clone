import spotify_web_api from 'spotify-web-api-node';

const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-private",
  "user-read-email",
  "user-follow-read",
  "user-follow-modify",
  "user-library-read",
  "user-library-modify",
  "streaming",
  "app-remote-control",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "playlist-modify-private",
  "playlist-read-collaborative",
  "playlist-read-private",
  "playlist-modify-public"
].join(",");

const params = {
  scope: scopes,
}

const queryParamString = new URLSearchParams(params);
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

var CachedClient = null;

export default function spotifyApi(){

  if(CachedClient) return CachedClient;

  const spotifyWebApi = new spotify_web_api({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  });

  CachedClient = spotifyWebApi;

  return spotifyWebApi;
}

export {LOGIN_URL};