const express =  require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors =  require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
var favicon = require('serve-favicon')

//Database connect
mongoose.connect(config.database);

mongoose.connection.on('connected', () =>{
	console.log('connected to database' + config.database);
});

mongoose.connection.on('error', (err) =>{
	console.log('database error' + err);
});

const app=express();

const users = require('./routes/users');
//Port Number
const port= process.env.PORT || 8080;

//Cors Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middlewar
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);

//Index Route
app.get('/', (req,res) => {
	res.send("Invalid Endpoint");
});

app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

//Start Server
app.listen(port, () => {
console.log('server started on port' +port);
});