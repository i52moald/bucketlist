var restify     =   require('restify');
var mongojs     =   require('mongojs');
var morgan  	=   require('morgan');
var db          =   mongojs('bucketlistApp', ['appUsers','bucketLists']);
var server      =   restify.createServer();

var manageUsers = require('./auth/manageUser')(server, db);
var manageLists =   require('./list/manageList')(server, db);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(morgan('dev')); // LOGGER
 
// CORS
server.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
 
//Start Server
server.listen(process.env.PORT || 9804, function () {
    console.log("Server started @ ",process.env.PORT || 9804);
});