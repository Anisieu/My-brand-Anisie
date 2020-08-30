const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../../index");
const id = require("./post.test");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Test for making a comment", () => {

    it("should return 200 for a successful sent comment", (done) => {

    
        const newcomment = {
            name: "Any",
            email: "any@gmail.com",
            message: "any comment"
        }
        //const blogId = "5f4640f7b926436796b33685"
        chai.request(app)
            .post(`/blog/${id}/comment`)
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

    it("should return 400 for unfilled fields of a comment", (done) => {

    
        const newcomment = {
            name: "",
            email: "any@gmail.com",
            message: "any comment"
        }
        //const blogId = "5f4640f7b926436796b33685"
        chai.request(app)
            .post(`/blog/${id}/comment`)
            .send(newcomment)
            .end((err, res) => {
                //console.log(res.body)
                res.should.have.status(400);
                done()
            });

    })

    it("should return 400 for invalid email in a comment", (done) => {

    
        const newcomment = {
            name: "",
            email: "any@gmailcom",
            message: "any comment"
        }
        //const blogId = "5f4640f7b926436796b33685"
        chai.request(app)
            .post(`/blog/${id}/comment`)
            .send(newcomment)
            .end((err, res) => {
                //console.log(res.body)
                res.should.have.status(400);
                done()
            });

    })

})


describe("Test to retrieve all comments", () => {
    it("should  return 200 for a successful comments retrieval", (done) => {
        //const blogId = "5f4640f7b926436796b33685"
        chai.request(app)
            .get(`/blog/${id}/comment`)
            .end((err, res) => {
                res.should.have.status(200);
                // console.log(res.body);
                res.body.should.be.a('array');
                done();
            });
    });
});