let client = require('../dbConnection');
const {ObjectId } = require('mongodb');

let collection = client.db('PetsDetails').collection('Pets');

function postPet(pet, callback) {
    collection.insertOne(pet, callback);
}

function getAllPets(callback) {
    collection.find({}).toArray(callback);
}

function getPetById(id, callback) {
    const objectId = new ObjectId(id);
    collection.findOne({ _id: objectId }, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

module.exports = {postPet, getAllPets, getPetById}