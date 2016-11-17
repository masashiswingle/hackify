import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Lyrics from './LyricsComponent';
import Map from './MapComponent';
import Tree from './TreeComponent';
import Track from './TrackComponent';
import Album from './AlbumComponent';

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(

      <Tabs className="navTabs" selectedIndex={this.index}>

          <TabList className="navlist">
            <Tab >
              <img className="nav" id="playlist" src={'/assets/playlist.png'} />
            </Tab>
            <Tab >
              <img className="nav" id="worldMap" src={'/assets/worldMap.png'} />
            </Tab>
            <Tab>
              <img className="nav" id="audacity" src={'/assets/audacity.png'} />
            </Tab>
            <Tab>
              <img className="nav" id="uncheck" src={'/assets/uncheck.png'} />
            </Tab>
            <Tab>
              <img className="nav" id="tournament" src={'/assets/tournament.png'} />
            </Tab>
          </TabList>

          <TabPanel><Lyrics /></TabPanel>
          <TabPanel><Map /></TabPanel>
          <TabPanel><Track /></TabPanel>
          <TabPanel><Album /></TabPanel>
          <TabPanel><Tree /></TabPanel>

      </Tabs>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSong: state.currentSong
  };
};

export default connect(mapStateToProps)(Nav);
