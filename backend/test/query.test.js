const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../index");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Test for creating a query", () =>{

    it("should return 200 for a successful query creation", (done) =>{

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY0NThhMWY5MDI3YWIyOGMyMTQxMDJhIiwiYWRtaW4iOmZhbHNlfSwiaWF0IjoxNTk4MzkyODYzLCJleHAiOjE1OTg1NjU2NjN9.2A1NV0Srvx-opLhi_F08hja61EuD7ju0gam4JvFLuaI"
    const newQuery = {
        name: "Any",
        email: "any@gmail.com",
        message : "any comment"
      }
    chai.request(app)
            .post("/query/create")
            .set("token",token)
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
   
})


describe("Test to retrieve all queries", () => {
        it("should 200 for a successful queries retrieval", (done) => {
            chai.request(app)
                .get('/query/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    // console.log(res.body);
                    res.body.should.be.a('array');
                    done();
                });
        });
});