import React from 'react';
import { ReactMic } from 'react-mic';
import WaveSurfer from 'wavesurfer.js';
import './Record.css';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import Record from './img/Record';
import StopRecord from './img/StopRecord';
import PlayIcon from './img/PlayIcon';

export default class RecordComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      playing: false,
      url: "",
      totalTime: 0,
      currentTime: 0,
      attemps: 0,
    }
  }
  startRecording = () => {
    this.setState({ record: true});
    const record = document.querySelector('.sound-wave');
    const recordPlayer = document.querySelector('.Wave');
    recordPlayer.style.display = "none";
    record.style.display = "block"
  }

  stopRecording = () => {
    this.setState({ record: false});
  }

  // onData(recordedBlob) {
  //   console.log('chunk of real-time data is: ', recordedBlob);
  // }
  
  onStop = (recordedBlob) => {
    const track = document.querySelector('#track');
    const record = document.querySelector('.sound-wave');
    const recordPlayer = document.querySelector('.Wave');

    recordPlayer.style.display = 'block';
    record.style.display = 'none';
    console.log('recordedBlob is: ', recordedBlob);
    this.setState({playing: false, attemps: this.state.attemps + 1, url: recordedBlob["blobURL"]})
    this.waveform.load(track);

  }
  // This is a wave player
  componentDidMount() {
    // Wave form Audio 
    //  
    // Below
    this.waveformAudio = WaveSurfer.create({
      container: document.querySelector('#waveform__audio'),
      waveColor: '#7f8c8d',
      progressColor: '#FFFFFF',
      height: 90,
      barHeight: 0.5,
      barRadius: 2,
      barMinHeight: 1,
      barWidth: 3,
      barGap: 5,
      cursorWidth: 0,
      maxCanvasWidth: 600
    });

    // load audio first
    const trackAudio = document.querySelector("#trackAudio");
    this.waveformAudio.load(trackAudio);

    // set total time of waveform audio when audio ready
    this.waveformAudio.on('ready', () => {
      var totalTime = this.waveformAudio.getDuration() *1000;
      this.setState({ totalTime: totalTime})
    })

    // set current tiem of waveform audio when audio process
    this.waveformAudio.on('audioprocess', () => {
      if(this.waveformAudio.isPlaying()) {
        var currentTime = this.waveformAudio.getCurrentTime() *1000;
        this.setState({ currentTime: currentTime});
      }
    })
    // when waveform finish play the record
    this.waveformAudio.on('finish', () => {
      this.waveform.play();
    })
    // 
    // Waveform 
    // Below
    this.waveform = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#7f8c8d',
      progressColor: '#FFFFFF',
      height: 90,
      barHeight: 0.5,
      barRadius: 2,
      barMinHeight: 1,
      barWidth: 3,
      barGap: 5,
      cursorWidth: 0,
      maxCanvasWidth: 600,
    });
    // set time current
    this.waveform.on('audioprocess', () => {
      if(this.waveform.isPlaying()) {
        var totalTime = this.waveformAudio.getDuration() *1000;
        var currentTime = this.waveform.getCurrentTime() *1000;
        this.setState({currentTime: totalTime + currentTime});
      }
    });
    this.waveform.on('finish', () => {
      this.setState({playing: false})
    });
    this.waveform.on('ready', () => {
      var totalTime = this.waveform.getDuration() *1000;
      this.setState({ totalTime: this.state.totalTime + totalTime})
    });
  };
  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    
    this.waveformAudio.playPause();
    // this.waveform.playPause();
  };
  
  render() {
    // const url = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3';
    return (
      <div className="Record">
        <div className="WaveformContainer">
          <div className="wave__style">
            <div id="waveform__audio" className="Wave__audio"></div>
            <audio id="trackAudio" src={this.props.url} />
          </div>
          {/* <hr /> */}
          <div className="wave__style">
            <div id="waveform" className="Wave"></div>
            <audio id="track" src={this.state.url} />
          </div>
        </div>
        <div className="record__micro">
          <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            // onData={this.onData}
            mimeType="audio/wav"
            strokeColor="#EB5757"
            backgroundColor="#F5F5F5" />
        </div>
        <div className="detail">
          <div className="TimeGroup">
            <div>{moment.utc(this.state.currentTime).format("mm:ss")}</div>
            <div>{moment.utc(this.state.totalTime).format("mm:ss")}</div>
          </div>
          <div className="ButtonGroup">
            <IconButton onClick={this.handlePlay}>
              {(!this.state.playing)? <PlayIcon /> : <PauseIcon />}
            </IconButton>
            <IconButton onClick={this.stopRecording}>
              {!this.state.record ? <StopRecord color="#8D91A0"/> : <StopRecord color="#212121"/> }
            </IconButton>
            <IconButton onClick={this.startRecording}>
              <Record />
            </IconButton>
          </div>
          <div>Attemps: {this.state.attemps}</div>
        </div>
      </div>
    );
  }
}