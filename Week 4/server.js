let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://mpmsulakshana:mano%4019981002@cluster0.oxaoo2y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function dbConnection() {
    try {
        await client.connect();
        collection = client.db('PetsDetails').collection('Pets');
        console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}

app.get('/', function (req,res) {
    res.render('index.html');
});

app.get('/api/pets', (req,res) => {
    getAllPets((err,result)=>{
        if (!err) {
            res.json({statusCode:200, data:result, message:'get all pets successful'});
        }
    });
});

app.get('/api/pet/:id', (req,res) => {
    getPetById(req.params.id, (err,result)=>{
        if (!err) {
            res.json({statusCode:200, data:result, message:'get all pets successful'});
        }
    });
});

app.post('/api/pet', (req,res)=>{

    if (!collection) {
        res.status(500).send('Database connection failed');
        return;
    }

    let pet = req.body;
    
    postPet(pet, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data:result, message:'success'});
        }
    });
});

function postPet(pet,callback) {
    collection.insertOne(pet,callback);
}

function getAllPets(callback){
    collection.find({}).toArray(callback);
}

function getPetById(id, callback){
    const objectId = new ObjectId(id);
    collection.findOne({ _id: objectId }, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
}

app.listen(port, ()=>{
    console.log('express server started');
    dbConnection();
});