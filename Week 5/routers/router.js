let express = require('express');
let router = express.Router();
let controller = require('../controllers/controller');

router.post('/', function(req,res){
    controller.postPet(req,res);
});

router.get('/', (req,res)=>{
    controller.getAllPets(req,res);
});

router.get('/:id', (req,res)=>{
    controller.getPetById(req,res);
});

router.delete('/', (req,res)=>{
    controller.getAllPets(req,res);
});


module.exports = router;