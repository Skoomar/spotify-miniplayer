import React from "react";
import "../styles/PlaylistBarOption.css";

function PlaylistBarOption({ title, Icon }) {
    return (
        <div className="playlistBarOption">
            {Icon && <Icon className="playlistBarOption__icon" />}
            {Icon ? <h4>{title}</h4> : <p>{title}</p>}
        </div>
    );
}

export default PlaylistBarOption;
