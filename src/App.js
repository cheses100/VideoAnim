import React, { Component } from 'react';
import { gsap } from "gsap";
import { Player,
  Shortcut,
  BigPlayButton,
  LoadingSpinner,
  ControlBar,
  VolumeMenuButton,
  PlaybackRateMenuButton } from 'video-react';
import styled from 'styled-components';
//import Resizer from './Resizer';
import 'video-react/dist/video-react.css';
import './App.css';

const tl = gsap.timeline({paused: true});
const tl2 = gsap.timeline({paused: true});
const str = "OK. This is cool.";
const str2 = "Isn't it?";
const str3 = "Oh. YEAH!";
const str4 = "click button ^ to continue";
const displacement = "325px";
let nextStop = 0;
let duration;
let theHeight, theWidth;

const Main = styled.div`
  /* text-align: center;
  top: 10px;
  left: 10px;
  overflow: hidden; */
  width: 100vh;
  height: 10% !important;
  minHeight: 100vh;
  /* padding-bottom: 56.25%; */
  position: relative;
  /* object-fit: scale-down; */
  /* overflow: hidden; */
`;


// const Video = styled.Player`
//   position: absolute;
//   top: 10px;
//   left: 10px;
//   /* max-width: 65%; */
//   width: 1300px !important;
//   height: 731.25px !important;
//   padding-top: 10px !important;
//   padding-left: 10px !important;
//   overflow: hidden;
// `



let data = [
    {
      stopAt: 14,
      tl: 'tl2',
      label: 'start',
    },
    {
      stopAt: 25,
      tl: 'tl2',
      label: 'start',
    }
  ];

  const getUrlParameter = function getUrlParameter(sParam) {
    const sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&');
    let    sParameterName, i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
  };

 const name = getUrlParameter('fname');
 let posterURL = "https://img.hyperise.io/i/8dB6VRc02.png?first_name=" + name;

 const salutation = "hi there " + name;
 const arr = salutation.split('');

 function Salut(props) {
  //const chars = props.chars;
  const listItems = arr.map((letter) =>
    <h1 className="mytext">{letter}</h1>
  );
  return (
    <div className="salut">{listItems}</div>
  );
}

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleProgress = this.handleProgress.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleSeeked = this.handleSeeked.bind(this);
    this.handleSeeking = this.handleSeeking.bind(this);
    this.onClick = this.onClick.bind(this);
    this.player = React.createRef();
    this.container = React.createRef();
    this.state = {
      nextStop: 0,
      dimensions: {
        width: this.container.offsetWidth,
        height: this.container.offsetHeight,
      },
      mainStyle: {
        /* text-align: center;
        top: 10px;
        left: 10px;
        overflow: hidden; */
        width: '100vh',
        height: '10% !important',
        minHeight: '100vh',
        /* padding-bottom: 56.25%; */
        position: 'relative',
        marginLeft: '10px'
        /* object-fit: scale-down; */
        /* overflow: hidden; */
      }
    };
  }
  updateDimensions() {
    let newStyle = {...this.state.mainStyle};
    if (window.innerHeight*1.6< window.innerWidth) {
      newStyle.width = window.innerHeight*1.5;
    } else {
      newStyle.width = window.innerWidth*.9;
    }
    this.setState({mainStyle: newStyle});
  }

  componentDidMount() {
    this.setState({
      dimensions: {
        width: this.container.offsetWidth,
        height: this.container.offsetHeight,
      },
    });
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.updateDimensions();
    this.player.actions.toggleFullscreen=()=>{console.log('prevent full screen video');};
    //const arr = this.salutation.split('');


    console.log(posterURL);
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    const { player } = this.player.getState();
    duration = player.duration;
    const time1 = duration/3.3;
    const time2 = duration*.4;
    gsap.set(".salut", {perspective: 400});
    tl.to('.video-react-video', {left: '-='+displacement, duration: 1, ease: "back.out(2.5)"}, 9);
    tl.to('.video-react-video', {left: '+='+displacement, duration: 2.5, ease: "back.out(1.7)"}, 13);
    tl.fromTo('.mytext', {left: 0, opacity: 0, color: 'blue', fontSize: 24,  rotationX:180, transformOrigin:"0% 50% -50"},
                         {duration: 2,  ease: "back.out(1.7)", left: '140px', opacity: .5, fontSize: 60, rotationX: 0, transformOrigin:"50% 50% -50", minWidth: "14px",stagger: 0.2}, 2);
    tl.to('.mytext', {left: '1300px', duration: 1.5, ease: "back.out(1.7)", opacity: 0, color: 'white', width: 0, minWidth: 0}, 8);
    tl.to(['.rec1', '.mytext2'], {left: '-='+displacement, width: displacement, opacity:.7, duration: 1, ease: "back.out(2.5)", stagger: 0.2}, 9);
    tl.to(['.rec1', '.mytext2'], {left: '+='+displacement, width: 0, opacity:0, duration: 2.5, ease: "back.out(1.7)", stagger: 0.5}, 15);

    // tl.to(['.rec1', '.mytext2'], {left: '-=325px', width: '325px', opacity:.7, duration: 1, ease: "back.out(2.5)", stagger: 0.2}, 9);
    // tl.to(['.rec1', '.mytext2'], {left: '+=326px', width: 0, opacity:0, duration: 2.5, ease: "back.out(1.7)", stagger: 0.5}, 15);
    //need a fake event to sync play with video
    tl.to('.rec1', {left: '-1px', duration: 0.1}, 33);

    tl2.to(['.button', '.mytext3'], {left: '-='+displacement, width: '285px', opacity: 1, duration: 1, ease: "back.out(0.5)"}, 'start' );
    tl2.to(['.button', '.mytext3'], {left: '+='+displacement, width: 0, opacity:0, duration: .3, ease: "back.out(0.2)"}, 'exit' );
  }

  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state,
    });
  }

  handleProgress = () => {
    const { player } = this.player.getState();
    console.log(theWidth + " "+ theHeight);
    console.log("window: " + window.innerWidth + " " + window.innerHeight)
    const cTime = player.currentTime;

    if(nextStop <= data.length - 1) {
      const stop = data[nextStop];
      console.log(player.currentTime);
      if(cTime >= stop.stopAt) {
        this.player.pause();
        tl.pause();
        tl2.play('start');
        tl2.pause(1);
      }
    }
  }

  handlePlay = () => {
    const { player } = this.player.getState();
    duration = player.duration;

    if(nextStop <= data.length - 1) {
      const stop = data[nextStop];
      if(stop.stopAt > player.currentTime) {
        tl.play();
        this.player.play();
      } else {
        tl.seek(stop.stopAt);
        this.player.seek(stop.stopAt);
      }
    } else{
      tl.play();
      this.player.play();
    }
  }

  handlePause  = () => {
    const { player } = this.player.getState();
    tl.pause();
  }

  handleSeeked  = () => {
    const { player } = this.player.getState();
    //console.log('current time: '+player.currentTime);
    if(nextStop <= data.length - 1) {
      const stop = data[nextStop];
      if(stop.stopAt <= player.currentTime) {
        tl.seek(stop.stopAt);
        this.player.seek(stop.stopAt);
        tl.pause();
        this.player.pause();
      } else if(stop.stopAt > player.currentTime) {
        tl2.play('exit');
        this.player.play();
        tl.time(player.currentTime);
      } else tl.time(player.currentTime);
    } else tl.time(player.currentTime);
  }

  handleSeeking  = () => {
    const { player } = this.player.getState();
  }

  onClick = () => {
    console.log('clicked');
    const { player } = this.player.getState();
    tl2.play('exit');

    nextStop++;

    this.handlePlay();
  }

  render() {
    const { dimensions } = this.state;
    return (
      <div style={this.state.mainStyle}>

        <Player poster={posterURL}
          ref={player => {this.player = player;}}
          onTimeUpdate={this.handleProgress.bind(this)}
          onPlay={this.handlePlay.bind(this)}
          onPause={this.handlePause.bind(this)}
          onSeeked={this.handleSeeked.bind(this)}
          onSeeking={this.handleSeeking.bind(this)}>
          <source src="http://media.w3.org/2010/05/bunny/trailer.mp4" />
          <Shortcut />
          <BigPlayButton position="center" />
          <LoadingSpinner />
          <ControlBar className="controls" autoHide={true}>
            <VolumeMenuButton vertical />
            <PlaybackRateMenuButton rates={[0.5, 1, 1.25, 1.5]} order={7}/>
          </ControlBar>
        </Player>
        <Salut  ></Salut>
        <div className='rec1'>
          <h1 className='mytext2' >{str}</h1>
          <h1 className='mytext2' >{str2}</h1>
        </div>
        <button className='button' onClick={this.onClick.bind(this)}>{str3}</button>
        <h2 className='mytext3' >{str4}</h2>

      </div>
    );
  }
}

export default App;
