import React, { Component } from 'react';

class Git extends Component {

  render() {
    return(
      <div>
        <div className="container-fluid git">

          <br></br><br></br>

          <h1 id="team">best team</h1>

          <br></br><br></br>

          <div className="row inner">
            <div className="col-sm-3 col-md-3 col-lg-3">
              <a href="https://github.com/alina7091"><img className="gitPic" src={'/assets/alinaGit.jpeg'}/></a>
              <h2>alina lobastova</h2>
               <p id = 'mainunderline'>_________</p>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3">
              <a href="https://github.com/jemilezzet"><img className="gitPic" src={'/assets/jemilGit.jpeg'}/></a>
              <h2>jemil ezzet</h2>
              <p id = 'mainunderline'>_________</p>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3">
              <a href="https://github.com/joannexin"><img className="gitPic" src={'/assets/joanneGit.jpeg'}/></a>
              <h2>joanne xin</h2>
              <p id = 'mainunderline'>_________</p>
            </div>
            <div className="col-sm-3 col-md-3 col-lg-3">
              <a href="https://github.com/masashiswingle"><img className="gitPic" src={'/assets/masashiGit.jpeg'}/></a>
              <h2>masashi swingle</h2>
              <p id = 'mainunderline'>_________</p>
            </div>
          </div>

        </div>

        <br></br>

        <footer className="footer">
          <p>copyright © 2016 soundBear.</p>
          <small>All rights reserved</small>
        </footer>

        <br></br>
      </div>
    )
  }
}


export default Git;
