/*
|--------------------------------------------------------------------------
| Global APP Init
|--------------------------------------------------------------------------
*/
process.env.ORA_SDTZ = 'UTC';
global._directory_base = __dirname;
global.config = {};
config.app = require('./config/app.js');
config.database = require('./config/database.js')['inspection'][config.app.env];


/*
|--------------------------------------------------------------------------
| APP Setup
|--------------------------------------------------------------------------
*/
// Node Modules
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

/*
|--------------------------------------------------------------------------
| APP Init
|--------------------------------------------------------------------------
*/
// Parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse request of content-type - application/json
app.use(bodyParser.json());


// Setup Database
mongoose.Promise = global.Promise;
mongoose.connect(config.database.url, {
    useNewUrlParser: true,
    ssl: config.database.ssl
}).then(() => {
    console.log("Database :");
    console.log("\tStatus \t\t: Connected");
    console.log("\tMongoDB URL \t: " + config.database.url + " (" + config.app.env + ")");
}).catch(err => {
    console.log("Database :");
    console.log("\tDatabase Status : Not Connected");
    console.log("\tMongoDB URL \t: " + config.database.url + " (" + config.app.env + ")");
});

// Server Running Message
var server = app.listen(parseInt(config.app.port[config.app.env]), () => {
    console.log('Server');
    console.log("\tStatus \t\t: OK");
    console.log("\tService \t: " + config.app.name + " (" + config.app.env + ")");
    console.log("\tPort \t\t: " + config.app.port[config.app.env]);
});

/*
|--------------------------------------------------------------------------
| Routing
|--------------------------------------------------------------------------
*/
require('./routes/api.js')(app);
