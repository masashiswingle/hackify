require('babel-register')({
        "presets": ["stage-0", "es2015"]
});

const should = require('should');
const _ = require('lodash');
const mainReducer = require('../../src/redux/reducers');

describe('Reducers-', () => {
  const { mainReducer } = mainReducer;
  describe('SWITCH_VIEW_TO_PLAYER', () => {
    it('mainReducer: Should return new view', () => {
      mainReducer({}, 'SWITCH_VIEW_TO_PLAYER').view.should.equal('player');
    });
  });
});