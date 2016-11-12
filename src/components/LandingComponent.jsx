import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchViewToPlayer } from '../redux/actions';
import * as helpers from '../modules/ajax';
import Song from '../modules/Song';
import { annyangCall } from '../annyang';
import { tree }  from '../visualization/artists-tree';

class Landing extends Component {

  searchFromLanding() {
    helpers.youTubeGetSong($('#srch-term').val(), (response) => {
      var song = new Song(response.items[0].id.videoId, response.items[0].snippet.title, response.items[0].snippet.thumbnails.default.url);
      this.props.switchViewToPlayer('player', song);
    });
  }
  annyang () {
    annyangCall();
    $('#siri').show();
    $('.js-trigger-overlay-start').hide();
  }
    componentDidMount() {
     var returnResult = tree();
      returnResult.resizeOverlay();


      var artist = {
          "external_urls" : {
            "spotify" : "https://open.spotify.com/artist/0OdUWJ0sBjDrqHygGUXeCF"
          },
          "followers" : {
            "href" : null,
            "total" : 306565
          },
          "genres" : [ "indie folk", "indie pop" ],
          "href" : "https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF",
          "id" : "0OdUWJ0sBjDrqHygGUXeCF",
          "images" : [ {
            "height" : 816,
            "url" : "https://i.scdn.co/image/eb266625dab075341e8c4378a177a27370f91903",
            "width" : 1000
          }, {
            "height" : 522,
            "url" : "https://i.scdn.co/image/2f91c3cace3c5a6a48f3d0e2fd21364d4911b332",
            "width" : 640
          }, {
            "height" : 163,
            "url" : "https://i.scdn.co/image/2efc93d7ee88435116093274980f04ebceb7b527",
            "width" : 200
          }, {
            "height" : 52,
            "url" : "https://i.scdn.co/image/4f25297750dfa4051195c36809a9049f6b841a23",
            "width" : 64
          } ],
          "name" : "Band of Horses",
          "popularity" : 59,
          "type" : "artist",
          "uri" : "spotify:artist:0OdUWJ0sBjDrqHygGUXeCF"
        }

      
        returnResult.setRoot(artist);
      

       // console.log('yo', tree().getAllArtists());

    }

  render() {

    return (
      <div className="container" >

        <div className="heading row" >
          <div className="col-md-1 inline" id='headlogo'>
            <a href="/"><img id="logo" src={'/assets/logo.png'}/><p >soundBear.</p></a>
          </div>
        </div>

        <button className="js-trigger-overlay-about" type="button">about</button>

        <hr></hr>

        <div id ='tree-container'></div>

        <div className="body">
          <div className="title">
            <h1 id="soundbear">soundBear</h1>
            <p id = 'mainunderline'>_________</p>
            <div id="description">
              <h4>hands-free access</h4>
              <h4>to your favorite music</h4>
            </div>
          </div>
          <button className="js-trigger-overlay-start" onClick = {this.annyang} type="button">start listening</button>
          <img id="siri" src={'/assets/siri.gif'}/>
        </div>
        <div id="conversation"></div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.view
  };
};

export default connect(mapStateToProps, { switchViewToPlayer: switchViewToPlayer })(Landing);
