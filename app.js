//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');


var app = express();
const route = require('./routes/route');

//Connect to Mongo DB
mongoose.connect('mongodb://localhost/contactlist');

//on connection
mongoose.connection.on('connected', () => {
    console.log('connected to database mongodb');
});

mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in database connection is ' + err);
    }


});

// port no
const port = 3000;

//adding Middleware --cors
app.use(cors());

//body-parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', route);

//testing server
app.get('/', (req, res) => {
    res.send('get method called');
});

app.listen(port, () => {
    console.log('Server Started On Port No ' + port);
});