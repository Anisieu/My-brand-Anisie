const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../../index");


// Configure chai
chai.use(chaiHttp);
chai.should();

let token;
describe(" Testing auth routes", () => {

    it("should return a token for a successful login", (done) => {
        chai.request(app)
            .post('/user/login')
            .send({
                "email": "admin@gmail.com",
                "password": "1234567"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('token');
                token = res.body.token;
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

    it("should return  400 for incorect password", (done) => {
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

    it("should return  400 for invalid password", (done) => {
        chai.request(app)
            .post('/user/login')
            .send({
                email: "name@gmailcom",
                password: "1010102345"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done()
            });
    });

    it("should return  400 required fields", (done) => {
        chai.request(app)
            .post('/user/login')
            .send({
                email: "name@gmailcom",
                password: ""
            })
            .end((err, res) => {
                res.should.have.status(400);
                done()
            });
    });


});

//module.exports=token;