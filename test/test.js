const app = require('../app.js');
const request = require('request');

let chai = require('chai');
const expect = chai.expect; 
const baseUrl = 'http://localhost:3000/'

describe('test routes', function() {
    it('responds to /', () => {
        request.get(baseUrl, function(err, body, res) {
            expect(res.statusCode).to.deep.equal(200);
        });
    });

    it('responds to /login', () => {
        request.get(baseUrl + "login", function(err, body, res) {
            expect(res.statusCode).to.deep.equal(200);
        });
    });

    it('responds to /register', () => {
        request.get(baseUrl + "register", function(err, body, res) {
            expect(res.statusCode).to.deep.equal(200);
        });
    });

    it('redirects to login if /add entered and not authenticated', () => {
        request.get(baseUrl + "add", function(err, body, res) {
            expect(res.statusCode).to.deep.equal(302);
            request.end();
        });
    });
});