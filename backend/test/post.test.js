const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../index");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Test for creating a blog post", () => {

    it("should return 200 for a successful post creation", (done) => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYzZmI2YmY2MjdlYWE3YmU0YjVmMDgyIiwiYWRtaW4iOnRydWV9LCJpYXQiOjE1OTgzNTYzNTQsImV4cCI6MTU5ODk2MTE1NH0.1KFFPddj89zUuJFLkJZRaVIxBwXezNx5iH9_yOV_OQE"
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
                //console.log(res.body)
                res.should.have.status(200);
                res.body.should.have.property('date');
                res.body.should.have.property('title').that.equals(newBlog.title);
                res.body.should.have.property('image_ulr').that.equals(newBlog.image_ulr);
                res.body.should.have.property('content').that.equals(newBlog.content);
                done()
            });

    })
    it("should return 403 for unauthorised access of post creation", (done) => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY0NzkyNDdjY2Q1YzY2MWY2NDkwZWZjIiwiYWRtaW4iOmZhbHNlfSwiaWF0IjoxNTk4NTI2MDM5LCJleHAiOjE1OTkxMzA4Mzl9.gxrYeWOT6zXGK8ehxNxfDYaslYL_kXAe8XRPLgmT7qU"
        const addBlog = {
            title: "The second blog post",
            image_ulr: "https://images.squarespace-cdn.com/content/v1/5a5906400abd0406785519dd/1552662149940-G6MMFW3JC2J61UBPROJ5/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/baelen.jpg?format=1500w",
            content: "Anisie blog post"
        }
        chai.request(app)
            .post("/blog/create")
            .set("token", token)
            .send(addBlog)
            .end((err, res) => {
                //console.log(res.body)
                res.should.have.status(403);
                done()
            });

    })

})



describe("Test to retrieve all blog posts", () => {

    // Test to get all blogs record

    it("should return 200 for a successful retrieval of posts records", (done) => {
        chai.request(app)
            .get('/blog/all')
            .end((err, res) => {
                res.should.have.status(200);
                //console.log(res.body);
                res.body.should.be.a('array');
                done();
            });
    });


})

describe("Test to retrieve one blog post", () => {
    it("should return 200 for a successful retrieval of one post", (done) => {
        const id = '5f3a6bebd1f434706185e3cd';
        chai.request(app)
            .get(`/blog/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });


    it("should return 404 for retrieving a blog that is not available", (done) => {
        const id = 5;
        chai.request(app)
            .get(`/blog/${id}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

describe("Test for deleting a blog post", () => {

    it("should return 200 for a successful post deletion", (done) => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYzZmI2YmY2MjdlYWE3YmU0YjVmMDgyIiwiYWRtaW4iOnRydWV9LCJpYXQiOjE1OTg0MzE0MTUsImV4cCI6MTU5OTAzNjIxNX0.LHsVBSZ1NjpU37p0bk-SDJB54dTFUOpzdg0NK2c_rtU"
        const id = '5f369c865400807d804acc11';
        chai.request(app)
            .delete(`/blog/${id}`)
            .set("token", token)
            .end((err, res) => {
                //console.log(res);
                res.should.have.status(200);
                done();
            });

    })
    it("should return 403 for unauthorised access of  post deletion", (done) => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY0NzkyNDdjY2Q1YzY2MWY2NDkwZWZjIiwiYWRtaW4iOmZhbHNlfSwiaWF0IjoxNTk4NTI2MDM5LCJleHAiOjE1OTkxMzA4Mzl9.gxrYeWOT6zXGK8ehxNxfDYaslYL_kXAe8XRPLgmT7qU"
        const id = '5f369c865400807d804acc11';
        chai.request(app)
            .delete(`/blog/${id}`)
            .set("token", token)
            .end((err, res) => {
                //console.log(res);
                res.should.have.status(403);
                done();
            });

    })
    it("should return 404  deleting a post which does not exist", (done) => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYzZmI2YmY2MjdlYWE3YmU0YjVmMDgyIiwiYWRtaW4iOnRydWV9LCJpYXQiOjE1OTg0MzE0MTUsImV4cCI6MTU5OTAzNjIxNX0.LHsVBSZ1NjpU37p0bk-SDJB54dTFUOpzdg0NK2c_rtU"
        const id = '5f369c865400807';
        chai.request(app)
            .delete(`/blog/${id}`)
            .set("token", token)
            .end((err, res) => {
                //console.log(res);
                res.should.have.status(404);
                done();
            });

    })

})

describe("Test for updating a blog post", () => {

    it("should return 200 for a successful  updated post", (done) => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYzZmI2YmY2MjdlYWE3YmU0YjVmMDgyIiwiYWRtaW4iOnRydWV9LCJpYXQiOjE1OTgzNTYzNTQsImV4cCI6MTU5ODk2MTE1NH0.1KFFPddj89zUuJFLkJZRaVIxBwXezNx5iH9_yOV_OQE"
        const updatedBlog = {
            title: "The updated blog post",
            image_ulr: "https://images.squarespace-cdn.com/content/v1/5a5906400abd0406785519dd/1552662149940-G6MMFW3JC2J61UBPROJ5/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/baelen.jpg?format=1500w",
            content: "Anisie updated again  blog post"
        }
        const id = '5f461f82b855a845d8b9422e';
        chai.request(app)
            .patch(`/blog/${id}`)
            .set("token", token)
            .send(updatedBlog)
            .end((err, res) => {
                //console.log(res.body)
                res.should.have.status(200);
                res.body.should.have.property('date');
                res.body.should.have.property('title').that.equals(updatedBlog.title);
                res.body.should.have.property('image_ulr').that.equals(updatedBlog.image_ulr);
                res.body.should.have.property('content').that.equals(updatedBlog.content);
                done()
            });

    })
    it("should return 403 for unauthorised access of  updated post", (done) => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY0NzkyNDdjY2Q1YzY2MWY2NDkwZWZjIiwiYWRtaW4iOmZhbHNlfSwiaWF0IjoxNTk4NTI2MDM5LCJleHAiOjE1OTkxMzA4Mzl9.gxrYeWOT6zXGK8ehxNxfDYaslYL_kXAe8XRPLgmT7qU"
        const updatedBlog = {
            title: "The updated blog post",
            image_ulr: "https://images.squarespace-cdn.com/content/v1/5a5906400abd0406785519dd/1552662149940-G6MMFW3JC2J61UBPROJ5/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/baelen.jpg?format=1500w",
            content: "Anisie updated again  blog post"
        }
        const id = '5f461f82b855a845d8b9422e';
        chai.request(app)
            .patch(`/blog/${id}`)
            .set("token", token)
            .send(updatedBlog)
            .end((err, res) => {
                //console.log(res.body)
                res.should.have.status(403);
                done()
            });

    })
    it("should return 404  updating a post which does not exist", (done) => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWYzZmI2YmY2MjdlYWE3YmU0YjVmMDgyIiwiYWRtaW4iOnRydWV9LCJpYXQiOjE1OTgzNTYzNTQsImV4cCI6MTU5ODk2MTE1NH0.1KFFPddj89zUuJFLkJZRaVIxBwXezNx5iH9_yOV_OQE"
        const updatedBlog = {
            title: "The updated blog post",
            image_ulr: "https://images.squarespace-cdn.com/content/v1/5a5906400abd0406785519dd/1552662149940-G6MMFW3JC2J61UBPROJ5/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/baelen.jpg?format=1500w",
            content: "Anisie updated again  blog post"
        }
        const id = '5f461f82b855a';
        chai.request(app)
            .patch(`/blog/${id}`)
            .set("token", token)
            .send(updatedBlog)
            .end((err, res) => {
                //console.log(res.body)
                res.should.have.status(404);
                done()
            });

    })

})