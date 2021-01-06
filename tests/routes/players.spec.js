'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();
const playerModel = {
  id: null,
  steamId: null,
  teamId: null,
  firstName: null,
  lastName: null,
  nickName: null,
  playtimeMod: null,
  playtimeSource: null,
  playtimeSandstorm: null,
  team_id: null
};
let app;
before(async () => {
  app = require('../../app/app');
});
after(async () => {
  app.stop();
});
describe('it should answer', () => {
  it('it displays 404', done => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        debugger;
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.type.should.equal('application/json');
        done();
      });
  });
});
describe('it should have a players route', () => {
  it('it should get all players', done => {
    chai
      .request(app)
      .get('/players')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.type.should.equal('application/json');
        for (var property in playerModel) {
          res.body[0].should.have.property(property);
        }
        done();
      });
  });
  it('it should get one player by /id', done => {
    chai
      .request(app)
      .get('/players/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.type.should.equal('application/json');
        for (var property in playerModel) {
          res.body.should.have.property(property);
        }
        done();
      });
  });
  it('it should get one player by ?id=1', done => {
    chai
      .request(app)
      .get('/players?id=1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.type.should.equal('application/json');
        for (var property in playerModel) {
          res.body.should.have.property(property);
        }
        done();
      });
  });
});
