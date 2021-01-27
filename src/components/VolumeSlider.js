import React from "react";
import { Slider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const volumeStyle = makeStyles({
    root: {
        width: 110,
    }
});

function VolumeSlider(onChangeFunc) {
    const classes = volumeStyle();
    return (
        <div className={classes.root}>
            <Slider onChange={onChangeFunc}/>
        </div>
    );
}

export default VolumeSlider;