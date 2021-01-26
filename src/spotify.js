// Keep all our Spotify API logic here so it's organised

// authEndpoint is the URL where we need to authenticate using Spotify
export const authEndpoint = "https://accounts.spotify.com/authorize";
// this is where the user is redirected if logging in was successful
const redirectUri = "http://localhost:3000/redirect";

const clientId = "0f7ee467893247ad8a517553da40a6d0";

// these are the permissions you need to ask Spotify for
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

// After being redirected, the URL we return to now contains the access token we need to authenticate users
// this extracts the token from the URL
export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        }, {});
};

// the final URL which must be called in order to authorise a user for the app
// contains the clientID and permissions so Spotify knows about our app and allows user authentication
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
