import React from "react";
import "../styles/Player.css";
import PlaylistBar from "./PlaylistBar";
import Header from "./Header";
import Body from "./Body";
import Controls from "./Controls";

function Player({ spotify }) {
    return (
        <div className="player">
            {/*<div className="player__body">*/}
                {/*<PlaylistBar />*/}
                {/*<Header spotify={spotify}/>*/}
                {/*<Body spotify={spotify}/>*/}
            {/*</div>*/}
            <Controls spotify={spotify}/>
        </div>
    );
}

export default Player;