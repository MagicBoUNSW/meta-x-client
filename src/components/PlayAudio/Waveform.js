import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import PauseIcon from "@material-ui/icons/Pause";
import PlayIcon from "components/Icons/PlayIcon";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  audioContainer:{
    display:"flex",
    alignItems:"center",
    height:30,
    "& Button":{
      borderRadius:"50%",
      height:30,
      width:30,
      padding:0,
    }
  },
  styleWave:{
    width:"50% !important",
    height:"30px !important",
    background:"white !important",
  }
}))
const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "black",
  cursorColor: "black",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  overflow:"none",
  height: 30,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true
});

export default function Waveform({ url }) {
  const classes = useStyles();
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(true);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function() {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [url]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = e => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  return (
    <div className={classes.audioContainer}>
      <div className="controls">
        <Button  onClick={handlePlayPause}>{!playing ?  <PauseIcon style={{height:"20px",width:"20px"}} />: <PlayIcon />}</Button>
      </div>     
      <div id="waveform" ref={waveformRef} className={classes.styleWave}/>
    </div>
  );
}
