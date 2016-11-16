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
            <h4>Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah</h4>
            <button className="learnmore" type="button">learn more</button>
          </div>
        </div>

        <br></br><br></br>
        <br></br><br></br>

        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-6">
            <h3>variety of</h3>
            <h2>commands</h2>
            <h4 className='text-mainunderline'>_________</h4>
            <h4>Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah</h4>
            <button className="learnmore" type="button">learn more</button>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6">
            <img className="landingpic" id="sound" src={'/assets/sound.jpg'}/>
          </div>
        </div>

        <br></br><br></br>
        <br></br><br></br>

        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-6">
            <img className="landingpic" id="info" src={'/assets/info.jpg'}/>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6">
            <h3>ask Bear for any</h3>
            <h2>information</h2>
            <h4 className='text-mainunderline'>_________</h4>
            <h4>Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah</h4>
            <button className="learnmore" type="button">learn more</button>
          </div>
        </div>

      </div>
    )
  }
}


export default LandingFeature;
