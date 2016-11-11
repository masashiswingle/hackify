require('babel-register')({
        "presets": ["react", "stage-0", "es2015"]
});

const should = require('should');
const _ = require('lodash');
const mainReducer = require('../../src/redux/reducers').default;

describe('Reducers-', () => {
  describe('SWITCH_VIEW_TO_PLAYER', () => {
    it('mainReducer: Should return new view', () => {
      var testData = {
        type: 'SWITCH_VIEW_TO_PLAYER',
        view: 'player',
        currentSong: {
          videoId: 'YQHsXMglC9A',
          title: 'Adele - Hello',
          artwork: 'https://i.scdn.co/image/f71517e8919892273de8d8677e42cdcf1b976aa7',
          songName: 'Hello',
          artistName: 'Adele'
        }
      };
      mainReducer({}, testData).view.should.equal('player');
    });
  });
});

