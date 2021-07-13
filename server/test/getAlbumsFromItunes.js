// chai
let chai = require("chai");
// chai http
let chaiHttp = require("chai-http");
// our server
let server = require("../app");
// Assertion Style
chai.should();
// make use of chaiHttp
chai.use(chaiHttp);

// test api 
describe('Test Api',()=>{
    // Test the Get search route
    describe("Get /search",()=>{
        it("IT should GET all the albums",(done)=>{
            // make http request from our server
            chai.request(server).get("/search")
                .end((err,response)=>{
                    // check the response status
                    response.should.have.status(200);
                    // check if the response is array
                    response.body.should.be.a('array');
                    done();
            });
        });
    });
});