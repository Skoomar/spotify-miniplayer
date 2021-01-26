import React from "react";
import "../styles/PlaylistBar.css";
import PlaylistBarOption from "./PlaylistBarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { LibraryMusic } from "@material-ui/icons";
import { useDataLayerValue } from "../DataLayer";

function PlaylistBar() {
    // use values from the data layer for playlists
    const [{ playlists }, dispatch] = useDataLayerValue();

    return (
        <div className="playlistBar">
            <img
                className="playlistBar__logo"
                src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
                alt="Spotify Logo"
            />

            <PlaylistBarOption title="Home" Icon={HomeIcon} />
            <PlaylistBarOption title="Search" Icon={SearchIcon} />
            <PlaylistBarOption title="Your Library" Icon={LibraryMusic} />
            <br />
            <strong className="playlistBar__title">Playlists</strong>
            <hr />
            {/* map through each playlist to display them on the sidebar*/}
            {playlists?.items?.map((playlist) => (
                <PlaylistBarOption title={playlist.name} />
            ))}
        </div>
    );
}

export default PlaylistBar;