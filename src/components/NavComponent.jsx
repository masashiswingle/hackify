import React, { Component } from 'react';
import { connect } from 'react-redux';
import Lyrics from './LyricsComponent';
import Map from './MapComponent';
import Tree from './TreeComponent';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { getLyrics } from '../modules/ajax';

import map from '../visualization/map';


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { lyrics: "Searching...", lyricsDone: false }

  }

  handleSelect(index, last) {
  }

  componentDidMount() {
    this.displayLyrics();
  }


  displayLyrics() {
    if (this.state.lyricsDone) { return }
    var that = this;
    getLyrics(this.props.currentSong.songName, this.props.currentSong.artistName, function(data) {
      that.setState({ lyrics: data, lyricsDone: true });
    });

  }

  render() {
    return(

      <Tabs onSelect={this.handleSelect.bind(this)} selectedIndex={0}>

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

          <TabPanel><Lyrics lyrics={this.state.lyrics}/></TabPanel>
          <TabPanel><Map /></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
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
