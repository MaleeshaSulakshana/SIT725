let express = require('express');
let app = express();
require('./dbConnection');

let port = process.env.port || 3000;
let router = require('./routers/router');

app.use(express.static(__dirname + '/view'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/pets',router);

app.get('/', function (req,res) {
    res.render('index.html');
});

// io.on('connection',(socket)=>{
//     console.log('** user connected **');
//     socket.on('disconnect', () => {
//         console.log('*** user disconnected ***');
//     });

//     setInterval(()=>{
//         parsedNumber = parseInt(Math.random()*10);
//         socket.emit('number', parsedNumber);
//         console.log('Emitting Number ' + parsedNumber);
//     }, 1000)
// });

app.listen(port, ()=>{
    console.log('express server started');
});
