import React, {useEffect} from "react";
import "../styles/Controls.css";
import {
    PlayCircleOutline,
    PauseCircleOutline,
    SkipPrevious,
    SkipNext,
    Shuffle,
    Repeat,
    RepeatOne,
    VolumeDown,
} from "@material-ui/icons";
import {Grid, Slider} from "@material-ui/core";
import {useDataLayerValue} from "../DataLayer";


function Controls({spotify}) {
    const [{token, item, playing, progress, shuffle_state, repeat_state}, dispatch] = useDataLayerValue();

    useEffect(() => {
        spotify.getMyCurrentPlaybackState().then((r) => {
            // console.log(r);

            dispatch({
                type: "SET_PLAYING",
                playing: r.is_playing,
            });

            dispatch({
                type: "SET_PROGRESS",
                progress: r.progress_ms,
            });

            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });

            dispatch({
                type: "SET_SHUFFLE",
                shuffle_state: r.shuffle_state,
            });

            dispatch({
                type: "SET_REPEAT",
                repeat_state: r.repeat_state,
            });
        });
    }, [spotify, item]);

    const playPause = () => {
        if (playing) {
            spotify.pause();
            dispatch({
                type: "SET_PLAYING",
                playing: false,
            });
        } else {
            spotify.play();
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        }
    };

    const playNextTrack = () => {
        spotify.skipToNext();
        spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        });
    };

    const playPreviousTrack = () => {
        spotify.skipToPrevious();
        spotify.getMyCurrentPlayingTrack().then((r) => {
            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        });
    };

    const setShuffle = () => {
        spotify.setShuffle(!shuffle_state)
        spotify.getMyCurrentPlaybackState().then((r) => {
            dispatch({
                type: "SET_SHUFFLE",
                shuffle_state: !shuffle_state,
            });
        });
    };

    const setRepeat = () => {
        let new_repeat_state;
        if (repeat_state === "off") {
            new_repeat_state = "context";
        } else if (repeat_state === "context") {
            new_repeat_state = "track";
        } else {
            new_repeat_state = "off";
        }
        spotify.setRepeat(new_repeat_state)
        spotify.getMyCurrentPlaybackState().then((r) => {
            dispatch({
                type: "SET_REPEAT",
                repeat_state: new_repeat_state,
            });
        });
    };

    return (
        <div className="controls">
            <div className="controls__left">
                <img
                    className="controls__albumLogo"
                    src={item?.album.images[0].url}
                    alt={item?.name}
                />
                {item ? (
                    <div className="controls__songInfo">
                        <h4>{item.name}</h4>
                        {/* join if there's multiple artists*/}
                        <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
                    </div>
                ) : (
                    <div className="controls__songInfo">
                        <h4>No song playing</h4>
                        <p>...</p>
                    </div>
                )}
            </div>
            <div className="controls__center">
                {shuffle_state ? (
                    <Shuffle className="controls__green" onClick={setShuffle}/>
                ) : (
                    <Shuffle className={"controls__icon"} onClick={setShuffle}/>
                )}
                <SkipPrevious className="controls__icon" onClick={playPreviousTrack}/>
                {playing ? (
                    <PauseCircleOutline fontSize="large" className="controls__icon"
                                        onClick={playPause}/>
                ) : (
                    <PlayCircleOutline fontSize="large" className="controls__icon"
                                       onClick={playPause}/>
                )}
                <SkipNext className="controls__icon" onClick={playNextTrack}/>
                {
                    (() => {
                        switch (repeat_state) {
                            case "track" : return <RepeatOne className="controls__green" onClick={setRepeat}/>;
                            case "context" : return <Repeat className="controls__green" onClick={setRepeat}/>;
                            default : return <Repeat className="controls__icon" onClick={setRepeat}/>;
                        }
                    })()
                }
                {/*{if (repeat_state === "off") {*/}
                {/*    return (<Repeat className="controls__icon" onClick={setRepeat}/>)*/}
                {/*} else if (repeat_state === "track") {(*/}
                {/*    <Repeat className="controls__green" onClick={setRepeat}/>*/}
                {/*)} else {*/}
                {/*    (<RepeatOne className="controls__green" onClick={setRepeat}/>)*/}
                {/*}}*/}

            </div>
            <div className="controls__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <VolumeDown/>
                    </Grid>
                    <Grid item xs>
                        <Slider/>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Controls;