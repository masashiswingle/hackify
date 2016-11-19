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
            <img className="landingpic" id="interaction" src={'/assets/interaction.jpg'}/>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6">
            <h3>real-time</h3>
            <h2>interaction</h2>
            <h4 className='text-mainunderline'>_________</h4>
            <h4 className = 'txt'> soundBear utilizes pin-point voice recognition software to seemlesly transcribe speech into various music player commands. For example, soundBear
            can play any song by simply saying 'Play' Song 'By' Artist. Go Give it a try!  </h4>
          </div>
        </div>

        <br></br><br></br>
        <br></br><br></br>

        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-6">
            <h3>variety of</h3>
            <h2>commands</h2>
            <h4 className='text-mainunderline'>_________</h4>
            <h4 className='txt'> soundBear offers a number of additional commands on top of playing a song.  Any button imaginable on a music player
            can be said effortlessly in voice for soundBear to understand. For example, adding a song to the song queue or pausing a selected song can be voiced by just "Add to Queue Song by Artist" 
             and "Stop", respectively. 
</h4>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6">
            <img className="landingpic" id="sound" src={'/assets/sound.jpg'}/>
          </div>
        </div>

        <br></br><br></br>
        <br></br><br></br>

        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-6">
            <img className="landingpic" id="infoIcon" src={'/assets/info.jpg'}/>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6">
            <h3>ask Bear for any</h3>
            <h2>information</h2>
            <h4 className='text-mainunderline'>_________</h4>
            <h4 className = 'txt'>For every song that plays, there will also be useful information regarding the Song and Artist presented in the tabs below the music player. 
            The tabs from left to right represent Lyrics, Most Popular Songs on our App, Top Songs of that Artist, Artist Albums and Available Markets, and 
            Related Artists</h4>
          </div>
        </div>

      </div>
    )
  }
}


export default LandingFeature;
