require('babel-register')({
        "presets": ["react", "stage-0", "es2015"]
});

const should = require('should');
const _ = require('lodash');
const mainReducer = require('../../src/redux/reducers').default;


describe('Reducers-', () => {
  describe('SWITCH_VIEW_TO_PLAYER', () => {
    let testData = {
      type: 'SWITCH_VIEW_TO_PLAYER',
      view: 'player',
      currentSong: {
        videoId: 'YQHsXMglC9A',
        title: 'Adele - Hello',
        artwork: 'https://i.scdn.co/image/f71517e8919892273de8d8677e42cdcf1b976aa7',
        songName: 'Hello',
        artistName: 'Adele',
        artistId: '4dpARuHxo51G3z768sgnrY',
        countries: ["AR","BO","BR","CL","CO","CR","DO","EC","GT","HN","MX","NI","PA","PE","PY","SV","US","UY"]
      }
    };
    it('mainReducer: Should return new view', () => {
      mainReducer({}, testData).view.should.equal('player');
    });
  });

  describe('INITIATE_QUEUE', () => {
    let testData = {
      type: 'INITIATE_QUEUE',
      view: 'player',
      currentSong: {
        videoId: 'YQHsXMglC9A',
        title: 'Adele - Hello',
        artwork: 'https://i.scdn.co/image/f71517e8919892273de8d8677e42cdcf1b976aa7',
        songName: 'Hello',
        artistName: 'Adele',
        artistId: '4dpARuHxo51G3z768sgnrY',
        countries: ["AR","BO","BR","CL","CO","CR","DO","EC","GT","HN","MX","NI","PA","PE","PY","SV","US","UY"]
      }
    };
    it('mainReducer: Should have property songQueue', () => {
      mainReducer({}, testData).should.have.property('songQueue');
    });
  });

    describe('CHANGE_CURRENT_SONG', () => {
    let oldData = {
      type: 'SWITCH_VIEW_TO_PLAYER',
      view: 'player',
      currentSong: {
        videoId: 'YQHsXMglC9A',
        title: 'Adele - Hello',
        artwork: 'https://i.scdn.co/image/f71517e8919892273de8d8677e42cdcf1b976aa7',
        albumName: "Adele",
        songName: 'Hello',
        artistName: 'Adele',
        artistId: '4dpARuHxo51G3z768sgnrY',
        countries: ["AR","BO","BR","CL","CO","CR","DO","EC","GT","HN","MX","NI","PA","PE","PY","SV","US","UY"]
      }
    };
    let newData = {
      type: 'CHANGE_CURRENT_SONG',
      view: 'player',
      currentSong: {
        videoId: "MYSVMgRr6pw",
        title: "Hozier - Take Me To Church",
        artwork: "https://i.scdn.co/image/012a058071e324d6751e5969dd4a651ee01f4501",
        albumName: "Hozier",
        songName: "Take Me to Church",
        artistName: "Hozier",
        artistId: "2FXC3k01G6Gw61bmprjgqS",
        countries: ["AU", "CA", "US"]
      }
    };
    it('mainReducer: Should change current song', () => {
      let state = mainReducer({}, oldData);
      mainReducer({}, oldData).currentSong.artistName.should.equal('Adele');
      mainReducer(state, newData).currentSong.artistName.should.equal('Hozier');
    });
  });

  describe('ADD_TO_QUEUE', () => {
    let oldData = {
      type: 'SWITCH_VIEW_TO_PLAYER',
      view: 'player',
      currentSong: {
        videoId: 'YQHsXMglC9A',
        title: 'Adele - Hello',
        artwork: 'https://i.scdn.co/image/f71517e8919892273de8d8677e42cdcf1b976aa7',
        albumName: "Adele",
        songName: 'Hello',
        artistName: 'Adele',
        artistId: '4dpARuHxo51G3z768sgnrY',
        countries: ["AR","BO","BR","CL","CO","CR","DO","EC","GT","HN","MX","NI","PA","PE","PY","SV","US","UY"]
      }
    };
    let queue = {
      type: 'INITIATE_QUEUE',
      songQueue: [],
      songHistory: []
    };
    let newData = {
      type: 'ADD_TO_QUEUE',
      view: 'player',
      videoId: "Jn6-TItCazo",
      title: "Arctic Monkeys - Arabella (Official Audio)",
      artwork: "https://i.scdn.co/image/10c7b4705032bc99da2d32ec2751ab3fdd64ca5f",
      albumName: "AM",
      songName: "Arabella",
      artistName: "Arctic Monkeys",
      artistId: "7Ln80lUS6He07XvHI8qqHH",
      countries: ["US"]
      
    };
    it('mainReducer: Should add new song to queue', () => {
      let state =  mainReducer({}, oldData);
      mainReducer({}, oldData).currentSong.artistName.should.equal('Adele');

      let initiated = mainReducer(state, queue);
      mainReducer(initiated, newData).songQueue[0].artistName.should.equal('Arctic Monkeys');
    });
  });

  describe('DEQUEUE_SONG', () => {
    let oldData = {
      type: 'SWITCH_VIEW_TO_PLAYER',
      view: 'player',
      currentSong: {
        videoId: 'YQHsXMglC9A',
        title: 'Adele - Hello',
        artwork: 'https://i.scdn.co/image/f71517e8919892273de8d8677e42cdcf1b976aa7',
        albumName: "Adele",
        songName: 'Hello',
        artistName: 'Adele',
        artistId: '4dpARuHxo51G3z768sgnrY',
        countries: ["AR","BO","BR","CL","CO","CR","DO","EC","GT","HN","MX","NI","PA","PE","PY","SV","US","UY"]
      }
    };
    let queue = {
      type: 'INITIATE_QUEUE',
      songQueue: [],
      songHistory: []
    };
    let newData = {
      type: 'ADD_TO_QUEUE',
      videoId: "Jn6-TItCazo",
      title: "Arctic Monkeys - Arabella (Official Audio)",
      artwork: "https://i.scdn.co/image/10c7b4705032bc99da2d32ec2751ab3fdd64ca5f",
      albumName: "AM",
      songName: "Arabella",
      artistName: "Arctic Monkeys",
      artistId: "7Ln80lUS6He07XvHI8qqHH",
      countries: ["US"]
    };
    let actionDequeue = {
      type: 'DEQUEUE_SONG',
    }
    it('mainReducer: Should set current song when dequeued', () => {
      let state =  mainReducer({}, oldData);
      mainReducer({}, oldData).currentSong.artistName.should.equal('Adele');

      let initiated = mainReducer(state, queue);
      mainReducer(initiated, newData).songQueue[0].artistName.should.equal('Arctic Monkeys');

      let dequeued = mainReducer(initiated, newData);
      mainReducer(dequeued, actionDequeue).currentSong.artistName.should.equal('Arctic Monkeys');
    });
  });

});

