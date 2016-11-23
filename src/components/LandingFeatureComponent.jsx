import React, { Component } from 'react';

class LandingFeature extends Component {

  render() {
    return(

      <div className="container-fluid">

        <br></br><br></br>

        <h1 id="getStart">how to get started?</h1>

        <br></br><br></br>

        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-6">
            <img className="landingpic" id="interaction" src={'/assets/landing1.gif'}/>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6">
            <h3>real-time</h3>
            <h2>interaction</h2>
            <h4 className='text-mainunderline'>_________</h4>
            <h4 className = 'txt'> soundBear utilizes pin-point voice recognition software to seamlesly transcribe speech into various music player commands. For example, soundBear
            can play any song if you simply press <i>space bar</i> and say <i>"play *song_name* by *artist_name*"</i>. Go give it a try!  </h4>
          </div>
        </div>

        <br></br><br></br>
        <br></br><br></br>

        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-6">
            <h3>variety of</h3>
            <h2>commands</h2>
            <h4 className='text-mainunderline'>_________</h4>
            <h4 className='txt'> soundBear offers a number of additional functionality on top of playing a song. Any command imaginable on a music player can be voiced effortlessly for
             soundBear to understand it! For example, adding a song to a song queue or pausing a selected song can be done  by commands  <i>"add to queue *song_name* by *artist_name*"</i> and <i>"stop"</i> respectively.</h4>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6">
            <img className="landingpic" id="sound" src={'/assets/landing2.png'}/>
          </div>
        </div>

        <br></br><br></br>
        <br></br><br></br>

        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-6">
            <img className="landingpic" id="infoIcon" src={'/assets/landing3.gif'}/>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6">
            <h3>explore</h3>
            <h2>artists and songs</h2>
            <h4 className='text-mainunderline'>_________</h4>
            <h4 className = 'txt'>For every song that plays, there will also be useful information about the song itself and/or artist available in the tabs below the music player. This information may be accessible through manually 
            clicking on the tabs or with spoken commands. The tabs from left to right represent Lyrics for the currently playing song, soundBear’s Top Songs, Selected Artist’s Most Popular Songs, Artist Albums with Countries that the 
            Song can be Listened to on Spotify, and Related Artists</h4>
          </div>
        </div>

      </div>
    )
  }
}


export default LandingFeature;
