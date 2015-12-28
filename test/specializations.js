var chai = require('chai');
var gw2Api = require('../index.js').default;
var request = require('node-fetch');
var _ = require('lodash');

describe('Specializations API', function () {
    it('should return all specializations', function (done) {
        gw2Api({
            name: 'specializations'
        }, function (err, data) {
            request('https://api.guildwars2.com/v2/specializations')
                .then(function (res) {
                    return res.text();
                })
                .then(function (body) {
                    chai.expect(JSON.parse(body)).to.deep.equal(data);
                    done();
                })
        })
    });
    it('should return single specialization', function (done) {
        gw2Api({
            name: 'specializations',
            ids: ['1']
        }, function (err, data) {
            request('https://api.guildwars2.com/v2/specializations/1')
                .then(function (res) {
                    return res.text();
                })
                .then(function (body) {
                    chai.expect(JSON.parse(body)).to.deep.equal(data[0]);
                    done();
                })
        })
    });
    it('should return multiple specializations', function (done) {
        gw2Api({
            name: 'specializations',
            ids: ['1','2']
        }, function (err, data) {
            request('https://api.guildwars2.com/v2/specializations?ids=1,2')
                .then(function (res) {
                    return res.text();
                })
                .then(function (body) {
                    chai.expect(JSON.parse(body)[_.findKey(JSON.parse(body), {id: 1})]).to.deep.equal(data[_.findKey(data, {id: 1})]);
                    chai.expect(JSON.parse(body)[_.findKey(JSON.parse(body), {id: 2})]).to.deep.equal(data[_.findKey(data, {id: 2})]);
                    done();
                })
        })
    })
});