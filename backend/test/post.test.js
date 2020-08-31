const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../../index");
//const token = require("./auth.test");


chai.use(chaiHttp);
chai.should();
let id;
let token;

describe("Test for creating a blog post", () => {

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

    it("should return 200 for a successful post creation", (done) => {
        const newBlog = {
            title: "The second blog post",
            image_ulr: "https://images.squarespace-cdn.com/content/v1/5a5906400abd0406785519dd/1552662149940-G6MMFW3JC2J61UBPROJ5/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/baelen.jpg?format=1500w",
            content: "Anisie blog post"
        }
        chai.request(app)
            .post("/blog/create")
            .set("token", token)
            .send(newBlog)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('date');
                res.body.should.have.property('title').that.equals(newBlog.title);
                res.body.should.have.property('image_ulr').that.equals(newBlog.image_ulr);
                res.body.should.have.property('content').that.equals(newBlog.content);
                id = res.body._id;
                console.log("id",id)
                done()
            });

    })
    it("should return 403 for unauthorised access of post creation", (done) => {
        const addBlog = {
            title: "The second blog post",
            image_ulr: "https://images.squarespace-cdn.com/content/v1/5a5906400abd0406785519dd/1552662149940-G6MMFW3JC2J61UBPROJ5/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/baelen.jpg?format=1500w",
            content: "Anisie blog post"
        }
        chai.request(app)
            .post("/blog/create")
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ3YWJhNTcyY2M4MjQzYThlYWM3ZTUiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluMkBnbWFpbC5jb20iLCJpYXQiOjE1OTg1MzI1MTd9.QKKBDel9ToffzJQxy3D2-Wz7gIHqMRmBWLI80jqMvFw")
            .send(addBlog)
            .end((err, res) => {
                res.should.have.status(403);
                done()
            });

    })

    it("should return 403 for unfound token", (done) => {
        const addBlog = {
            title: "The second blog post",
            image_ulr: "https://images.squarespace-cdn.com/content/v1/5a5906400abd0406785519dd/1552662149940-G6MMFW3JC2J61UBPROJ5/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/baelen.jpg?format=1500w",
            content: "Anisie blog post"
        }
        chai.request(app)
            .post("/blog/create")
            .set("token","ajn")
            .send(addBlog)
            .end((err, res) => {
                res.should.have.status(403);
                done()
            });

    })

})
describe("Test to retrieve all blog posts", () => {
    it("should return 200 for a successful retrieval of posts records", (done) => {
        chai.request(app)
            .get('/blog/all')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });


})

describe("Test to retrieve one blog post", () => {
    it("should return 200 for a successful retrieval of one post", (done) => {
        chai.request(app)
            .get(`/blog/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });


});

// describe("Test to like a blog post", () => {
//     it("should return 200 for a successfully like of a blog post", (done) => {
//         chai.request(app)
//             .get(`/blog/${id}`)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 const like = res.body.like;

//                 chai.request(app)
//                 .get(`/blog/${id}/like`)
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                     res.body.should.have.property('like').that.equals(like + 1);
//                     done();
//                 });
//             });
//     });


// });

describe("Test for updating a blog post", () => {
    it("should return 200 for a successful  updated post", (done) => {
        const updatedBlog = {
            title: "The updated blog post",
            image_ulr: "https://images.squarespace-cdn.com/content/v1/5a5906400abd0406785519dd/1552662149940-G6MMFW3JC2J61UBPROJ5/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/baelen.jpg?format=1500w",
            content: "Anisie updated again  blog post"
        }
        chai.request(app)
            .patch(`/blog/${id}`)
            .set("token", token)
            .send(updatedBlog)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('date');
                res.body.should.have.property('title').that.equals(updatedBlog.title);
                res.body.should.have.property('image_ulr').that.equals(updatedBlog.image_ulr);
                res.body.should.have.property('content').that.equals(updatedBlog.content);
                done()
            });

    })
    it("should return 403 for unauthorised access of  updating post", (done) => {


        const updatedBlog = {
            title: "The updated blog post",
            image_ulr: "https://images.squarespace-cdn.com/content/v1/5a5906400abd0406785519dd/1552662149940-G6MMFW3JC2J61UBPROJ5/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/baelen.jpg?format=1500w",
            content: "Anisie updated again  blog post"
        }
        chai.request(app)
            .patch(`/blog/${id}`)
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ3YWJhNTcyY2M4MjQzYThlYWM3ZTUiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluMkBnbWFpbC5jb20iLCJpYXQiOjE1OTg1MzI1MTd9.QKKBDel9ToffzJQxy3D2-Wz7gIHqMRmBWLI80jqMvFw")
            .send(updatedBlog)
            .end((err, res) => {
                res.should.have.status(403);
                done()
            });

    })

})

describe("Test for deleting a blog post", () => {
    it("should return 200 for a successful post deletion", (done) => {
        chai.request(app)
            .delete(`/blog/${id}`)
            .set("token", token)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });

    })
    it("should return 403 for unauthorised access of  post deletion", (done) => {
        chai.request(app)
            .delete(`/blog/${id}`)
            .set("token", "nvhgeb")
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });

    })
    it("should return 404  deleting a post which does not exist", (done) => {
        chai.request(app)
            .delete(`/blog/${"qeqyqetw"}`)
            .set("token", token)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });

    })
    it("should return 404  updating a post which does not exist", (done) => {
        const updatedBlog = {
            title: "The updated blog post",
            image_ulr: "https://images.squarespace-cdn.com/content/v1/5a5906400abd0406785519dd/1552662149940-G6MMFW3JC2J61UBPROJ5/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/baelen.jpg?format=1500w",
            content: "Anisie updated again  blog post"
        }
        chai.request(app)
            .patch(`/blog/${"bc ehget"}`)
            .set("token", token)
            .send(updatedBlog)
            .end((err, res) => {
                res.should.have.status(404);
                done()
            });

    })
    it("should return 404 for retrieving a blog that is not available", (done) => {
        chai.request(app)
            .get(`/blog/${"nnveje"}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

})
module.exports=id;