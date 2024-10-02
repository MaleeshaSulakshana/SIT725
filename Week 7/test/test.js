var expect = require("chai").expect;
var request = require("request");

var baseUrl = "http://localhost:3000/api/pets";

var recordId = "";

// For test post pet details endpoint
describe("Post pet details (POST)", function () {
  var url = `${baseUrl}`;

  var bodyData = {
    petName: "Kitty",
    petType: "Cat",
    petAge: "2",
    petOwnerName: "Sulakshana",
    location: "Sri Lanka",
    petImage:
      "https://media-be.chewy.com/wp-content/uploads/2019/10/28105544/catbehavior-HERO-1024x576.jpg",
  };

  it("Returns status code 201 to check if api works", function (done) {
    request.post(
      { url: url, json: bodyData },
      function (error, response, body) {
        recordId = body.data.insertedId;
        expect(body.statusCode).to.equal(201);
        done();
      }
    );
  });
});

// For test get by id pet details endpoint
describe("Get by id pet details (Get)", function () {
  var url = `${baseUrl}`;

  it("Returns status code 200 and data to check if get by id api works", function (done) {
    request.get(
      { url: `${url}/${recordId}` },
      function (error, response, body) {
        body = JSON.parse(body);
        expect(response.statusCode).to.equal(200);

        expect(body.data.petName).to.equal("Kitty");
        expect(body.data.petType).to.equal("Cat");
        expect(body.data.petAge).to.equal("2");
        expect(body.data.petOwnerName).to.equal("Sulakshana");
        expect(body.data.location).to.equal("Sri Lanka");
        expect(body.data.petImage).to.equal(
          "https://media-be.chewy.com/wp-content/uploads/2019/10/28105544/catbehavior-HERO-1024x576.jpg"
        );

        done();
      }
    );
  });
});

// For test get all pet details endpoint
describe("Get all pet details (Get)", function () {
  var url = `${baseUrl}`;

  it("Returns status code 200 and data (json) array to check if get all api works", function (done) {
    request.get({ url: `${url}` }, function (error, response, body) {
      body = JSON.parse(body);

      expect(response.statusCode).to.equal(200);
      expect(body.data).to.be.an("array");
      expect(body.data.length).to.be.above(0);

      done();
    });
  });
});
