const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../index");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Test for making a comment", () =>{

    it("should return 200 for a successful sent comment", (done) =>{

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY0NThhMWY5MDI3YWIyOGMyMTQxMDJhIiwiYWRtaW4iOmZhbHNlfSwiaWF0IjoxNTk4MzkyODYzLCJleHAiOjE1OTg1NjU2NjN9.2A1NV0Srvx-opLhi_F08hja61EuD7ju0gam4JvFLuaI"
    const newcomment = {
        name: "Any",
        email: "any@gmail.com",
        message : "any comment"
      }
    const blogId = "5f4640f7b926436796b33685"
    chai.request(app)
            .post(`/blog/${blogId}/comment`)
            .set("token",token)
            .send(newcomment)
            .end((err, res) => {
                //console.log(res.body)
                res.should.have.status(200);
                res.body.should.have.property('name').that.equals(newcomment.name);
                res.body.should.have.property('email').that.equals(newcomment.email);
                res.body.should.have.property('message').that.equals(newcomment.message);
                done()
            });

    })
   
})


describe("Test to retrieve all comments", () => {
        it("should  return 200 for a successful comments retrieval", (done) => {
            const blogId = "5f4640f7b926436796b33685"
            chai.request(app)
                .get(`/blog/${blogId}/comment`)
                .end((err, res) => {
                    res.should.have.status(200);
                    // console.log(res.body);
                    res.body.should.be.a('array');
                    done();
                });
        });
});