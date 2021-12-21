const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());

const SpotifyWebApi = require('spotify-web-api-node')

const scopes = [
  'user-read-private',
  'user-read-email',
  'user-read-recently-played',
  'user-top-read',
]

const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:8888/callback',
    clientId: '96f0cafd67fc42a7bdc71f3308ffd07b',
    clientSecret: '7ea5b6fd6d594f47a75610fae400d11f'
})

// allow user to sign in to Spotify
app.get('/login', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes))
})

// get auth token when user signs in
app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    
    if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        return;
      }

      spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];
  
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
        console.log('access_token:', access_token)
        console.log('refresh_token:', refresh_token)

        setInterval(async () => {
          const data = await spotifyApi.refreshAccessToken();
          const access_token = data.body['access_token'];
  
          console.log('new access_token:', access_token);
          spotifyApi.setAccessToken(access_token);
        }, expires_in / 2 * 1000);
      })
      .catch(error => {
        console.error('Error getting Tokens:', error);
        res.status(500).json(err);
      })
})

app.listen(8888, () => {
    console.log("backend server is running")
})