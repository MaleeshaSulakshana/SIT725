let collection = require('../models/pet');

const postPet = (req,res) => {
    let pet = req.body;
    collection.postPet(pet, (err,result) => {
        if (!err) {
            res.json({statusCode:201,data:result,message:'success'});
        }
    });
}

const getAllPets = (req,res) => {
    collection.getAllPets((error,result)=>{
        if (!error) {
            res.json({statusCode:200,data:result,message:'success'});
        }
    });
}

const getPetById = (req,res) => {
    collection.getPetById(req.params.id, (error,result)=>{
        if (!error) {
            res.json({statusCode:200,data:result,message:'success'});
        }
    });
}

const deletePet = (req,res) => {
    let pet = req.body;
    collection.deleteOne(pet, (err,result) => {
        if (!err) {
            res.json({statusCode:201,data:result,message:'success'});
        }
    });
}

module.exports = {postPet, getAllPets, getPetById}