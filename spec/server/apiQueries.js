require('babel-register')({
        "presets": ["stage-0", "es2015"]
});

const should = require('should');
const request = require('supertest');
const server = request.agent('http://localhost:8080');
const app = require('../../server');
const agent = request.agent(app);

describe('Requesting Audio Data', () => {
  beforeEach((done) => {
    done();
  });

   describe('Spotify', () => {
    it('Should respond with array of Artists', (done) => {
      server.post('/getSongs')
      .send({
        string: 'adele hello'
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.tracks.items.should.be.instanceOf(Array);
        done();
      });
    });
  });

});