var express = require('express'); // Get modules.
var routes = require('./routes'); // get routing data from routes folder
var http = require('http'); // server
var path = require('path');
var fs = require('fs');
var AWS = require('aws-sdk');
var cons = require('consolidate'); //view engine to html
var app = express();


app.set('port', process.env.PORT || 3000);
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'pub'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);


// app.use(express.static('./public'));

app.use(express.static(path.join(__dirname + '/pub')));
app.locals.theme = process.env.THEME; //Make the THEME environment variable available to the app.

// ---- App_Configuration -------------------------------
var config = fs.readFileSync('./app_config.json', 'utf8');
config = JSON.parse(config);
//-------------------------------------------------------


//---- AWS ----------------------------------------
// Create DynamoDB client and pass in region.
var db = new AWS.DynamoDB({region: config.AWS_REGION});
// Create SNS client and pass in region.
var sns = new AWS.SNS({ region: config.AWS_REGION});
// --------------------------------------------------


// ---- Server ------------------------------------
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express.js server listening on port ' + app.get('port'));
});
// ------------------------------------------------------


// ------- Routing  -----------------------------------
app.get('/', routes.index); // GET home page.
app.get('/planet', routes.planet);
app.get('/brands', routes.brands);
app.get('/commitments', routes.commitments);
app.get('/people', routes.people);
app.get('/pwp', routes.pwp);
app.get('/perspectives', routes.perspectives);
app.get('/products', routes.products);
app.get('/recipes', routes.recipes);
app.get('/governance', routes.governance);
app.get('/governance_video', routes.governance_video);
app.get('/philanthropy', routes.philanthropy);




// app.get('/', routes.index);
// ----------------------------------------------------
