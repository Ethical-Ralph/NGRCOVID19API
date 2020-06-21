const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();

const expect = chai.expect;

chai.use(chaiHttp);

const api = '/api/';

describe('Test server', () => {
    it('It should handle unknown route', (done) => {
        chai.request(server)
            .get('/unknownrandon')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

describe('All Routes', () => {
    it('It should return all national totals', (done) => {
        chai.request(server)
            .get(api + 'totals')
            .end((err, res) => {
                res.body.data.confirmedCases.should.be.a('number');
                res.body.data.activeCases.should.be.a('number');
                res.body.data.discharged.should.be.a('number');
                res.body.data.death.should.be.a('number');
                res.body.data.samplesTested.should.be.a('number');
                done();
            });
    });
    it('It should return all state totals', (done) => {
        chai.request(server)
            .get(api + 'states')
            .end((err, res) => {
                expect(res.body.data).to.be.an('array').that.is.not.empty;
                done();
            });
    });
    it('It should return a state totals', (done) => {
        chai.request(server)
            .get(api + 'states' + '/lagos')
            .end((err, res) => {
                expect(res.body.data).to.be.an('object').that.is.not.empty;
                expect(res.body.data).to.include.keys([
                    'state',
                    'confirmedCases',
                    'activeCases',
                    'discharged',
                    'death',
                ]);
                done();
            });
    });
    it('It should return national timeline data', (done) => {
        chai.request(server)
            .get(api + 'timelines')
            .end((err, res) => {
                expect(res.body).to.be.an('object').that.is.not.empty;
                expect(res.body.data).to.be.an('array').that.is.not.empty;
                done();
            });
    });

    it('It should return all state timeline data', (done) => {
        chai.request(server)
            .get(api + 'timelines' + '/states')
            .end((err, res) => {
                expect(res.body).to.be.an('object').that.is.not.empty;
                expect(res.body.data).to.be.an('array').that.is.not.empty;
                expect(res.body.data).to.have.be.of.length(36);
                done();
            });
    });

    it('It should return a state timeline data', (done) => {
        chai.request(server)
            .get(api + 'timelines' + '/states' + '/lagos')
            .end((err, res) => {
                expect(res.body).to.be.an('object').that.is.not.empty;
                expect(res.body.data).to.be.an('array').that.is.not.empty;
                done();
            });
    });
});
