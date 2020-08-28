const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../../index");
//const token = require("./auth.test");


// Configure chai
chai.use(chaiHttp);
chai.should();

let token;

describe("Test for creating a query", () => {

    it("should return 200 for a successful query creation", (done) => {
        const newQuery = {
            name: "Any",
            email: "any@gmail.com",
            message: "any comment"
        }
        chai.request(app)
            .post("/query/create")
            .send(newQuery)
            .end((err, res) => {
                //console.log(res.body)
                res.should.have.status(200);
                res.body.should.have.property('name').that.equals(newQuery.name);
                res.body.should.have.property('email').that.equals(newQuery.email);
                res.body.should.have.property('message').that.equals(newQuery.message);
                done()
            });

    })
    it("should return 400 for required fields", (done) => {
        const nQuery = {
            name: "",
            email: "any@gmail.com",
            message: "any comment"
        }
        chai.request(app)
            .post("/query/create")
            .send(nQuery)
            .end((err, res) => {
                //console.log(res.body)
                res.should.have.status(400);
                done()
            });

    })

    it("should return 400 for incorect email", (done) => {
        const neQuery = {
            name: "any",
            email: "any@gmail",
            message: "any comment"
        }
        chai.request(app)
            .post("/query/create")
            .send(neQuery)
            .end((err, res) => {
                //console.log(res.body)
                res.should.have.status(400);
                done()
            });

    })

})
describe("Test to retrieve all queries", () => {
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

    it("should 200 for a successful queries retrieval", (done) => {
        chai.request(app)
            .get('/query/all')
            .set("token", token)
            .end((err, res) => {
                res.should.have.status(200);
                // console.log(res.body);
                res.body.should.be.a('array');
                done();
            });
    });
});