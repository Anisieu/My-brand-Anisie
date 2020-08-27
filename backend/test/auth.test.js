// Import the dependencies for testing
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../index';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../index");


// Configure chai
chai.use(chaiHttp);
chai.should();


describe(" Testing auth routes", () => {


    it("should return 200 for a successful new  user  registration ", (done) => {
        chai.request(app)
            .post('/user/signup')
            .send({
                "username": "umwari037",
                "email": "umwari037@gmail.com",
                "password": "1234567897"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    it("should return 400 for an already exisiting credentials when registering a user ", (done) => {
        chai.request(app)
            .post('/user/signup')
            .send({
                "username": "mary234",
                "email": "2mary04@gmail.com",
                "password": "1234567897"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });

    it("should return a token for a successful login", (done) => {
        chai.request(app)
            .post('/user/login')
            .send({
                email: "name@gmail.com",
                password: "1234567"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('token');
                done()
            });
    });

    it("should return  400 for a user who does not exist", (done) => {
        chai.request(app)
            .post('/user/login')
            .send({
                email: "umuntu@gmail.com",
                password: "1010102345"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done()
            });
    });

    it("should return  400 incorect password", (done) => {
        chai.request(app)
            .post('/user/login')
            .send({
                email: "name@gmail.com",
                password: "1010102345"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done()
            });
    });
});