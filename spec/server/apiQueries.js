require('babel-register')({
        "presets": ["stage-0", "es2015"]
});

const should = require('should');
const request = require('supertest');
const server = request.agent('http://localhost:8080');
const app = require('../../server');
const agent = request.agent(app);

describe('Requesting audio data', () => {
  beforeEach((done) => {
    done();
  });

   describe('Spotify', () => {
    it('should respond with artis\'s id', (done) => {
      server.post('/getSongs')
      .send({
        string: 'adele hello'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
             console.log('hello spec', data.body)
        res.body.tracks.items[0].artists[0].id.should.be.type('string');
        done();
      });
    });
  });

  describe('Top Tracks', () => {
    it('should respond with array of songs', (done) => {
      server.post('/artistTracks')
      .send({
        string: 'muse hysteria'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.tracks.should.be.instanceOf(Array);
        done();
      });
    });
  });

  describe('Artist\'s Albums', () => {
    it('should respond with array of albums', (done) => {
      server.post('/artistAlbums')
      .send({
        string: 'arctic monkeys r u mine'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        res.body.items.should.be.instanceOf(Array);
        done();
      });
    });
  });

  xdescribe('Related Artists', () => {
    it('should respond with array of related artists', (done) => {
      server.post('/relatedArtists')
      .send({
        string: 'lady gaga poker face'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.artists[0].popularity.should.be.a.Number;
        done();
      });
    });
  });

  describe('Lyrics', () => {
    it('should respond with array of related artists', (done) => {
      server.post('/lyrics')
      .send({
        artist: 'radiohead',
        track: 'karma police'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.should.be.a.String;
        done();
      });
    });
  });

});