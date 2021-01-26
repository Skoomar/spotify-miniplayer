import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
    // set up variable token and its 'set' function as a state variable (using the manner in which you would for a functional component (because that's what this is))
    // const [token, setToken] = useState();

    const [{ user, token }, dispatch] = useDataLayerValue();

    // useEffect block used so that the access token is only taken from URL once upon the loading of the page
    useEffect(() => {
        const hash = getTokenFromUrl();
        // set the URL to empty so it doesn't show the access token - hiding access tokens keeps the app secure
        window.location.hash = "";
        const _token = hash.access_token;

        if (_token) {
            dispatch({
                type: "SET_TOKEN",
                token: _token,
            });
            // console.log("[token]", token);
            // setToken(_token);
            // tell the API what our token is for when it access Spotify Services
            spotify.setAccessToken(_token);

            // Use the React Context thingy with DataLayer thingy and reducer thingy
            spotify.getMe().then((user) => {
                dispatch({
                    type: "SET_USER",
                    user,
                });
            });
            spotify.getUserPlaylists().then((playlists) => {
                dispatch({
                    type: "SET_PLAYLISTS",
                    playlists,
                });
            });
            spotify.getPlaylist().then((playlist) => {
                dispatch({
                    type: "SET_DISCOVER_WEEKLY",
                    discover_weekly: playlist,
                });
            });
            dispatch({
                type: "SET_SPOTIFY",
                spotify: spotify,
            })
        }
    }, [token, dispatch])

    return (
        // Shows the login page if not logged in, else shows the player
        <div className="App">
            {token ? <Player spotify={spotify}/> : <Login />}
        </div>
    );
}

export default App;