const app = require('../app.js');
const request = require('request');
const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

let chai = require('chai');
const expect = chai.expect; 
const baseUrl = 'http://localhost:3000/'

describe('test redirect', function() {
    it('redirects to login if /add entered and not authenticated', () => {
        request.get(baseUrl + "add", function(err, body, res) {
            expect(res.statusCode).to.deep.equal(302);
            res.end();
        });
    });
});

describe('test routes', () => {
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

    it('404 for other routes /foo', () => {
        request.get(baseUrl + "foo", function(err, body, res) {
            // console.log("request", req);
            // console.log("response", res);

            expect(res.statusCode).to.deep.equal(404);
        });
    });
});