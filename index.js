var express =  require('express');
var path = require('path');
var app = express();
//var Config = require('./public/config');
/*var firebase = require("firebase"); delete
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
//console.log(Config.config);
*/
  var config = {
    apiKey: "AIzaSyAfpU9AaBvW5m4v4LqAsJq6yjDqnvGIOOk",
    authDomain: "my-pair-programming.firebaseapp.com",
    databaseURL: "https://my-pair-programming.firebaseio.com",
    projectId: "my-pair-programming",
    storageBucket: "my-pair-programming.appspot.com",
    messagingSenderId: "314355694894"
  };
/*
// Initialize the default app
var defaultApp = firebase.initializeApp(config);

console.log(defaultApp.name);  // "[DEFAULT]"

defaultAuth = defaultApp.auth();
//defaultStorage = defaultApp.storage();
defaultDatabase = defaultApp.database();
*/
/*
// ... or you can use the equivalent shorthand notation
defaultStorage = firebase.storage();
defaultDatabase = firebase.database();
*/ delete
//Define the port to run on
app.set('port',3000);
//app.use(cookieParser('secret')); delete
/*app.use(express.cookieSession({
	key:'app.sess',
	secret: 'secret'
}));*/
app.use(express.static(path.join(__dirname,'public')));


//console.log(defaultAuth)
//console.log(defaultAuth.currentUser) delete
/*   SET ROUTES */
/*
app.get('/', function (req, res){
	//console.log('the request    '  + req);
	//console.log('the response:     ' + res);
	res.sendFile('Findex.html');
	console.log("cookies:   ", req.cookies);
})
*/
app.get('/process_get', function (req, res){
	var Email = req.query.lEmail;
		var Passw = req.query.lPassW; 
	response = {
		Email: req.query.lEmail,
		Passw: req.query.lPassW 
	}
	console.log(response)
	defaultAuth.signInWithEmailAndPassword(Email, Passw).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  if(errorCode === 'auth/network-request-failed'){
	  	console.log(errorMessage)
	  }
	  else{
	  	console.log(errorMessage)
	  }
	});
	var userId =defaultAuth.currentUser;
	//console.log('userID:    ' + userId)
	//console.log(userId.email);
	res.end(JSON.stringify(response));
	console.log(req.session);
	//console.log(req.session.key);
	console.log(req.cookies);
	//res.redirect('delete.html')
	//console.log("cookies:   ", req.cookies);
})

app.get('/delete', function (req, res){
	console.log(req.session);
	console.log(req.session.key);
	console.log(req.cookies);
})

/* FOR CREATING USER EMAIL AND PASSWORD
defaultAuth.createUserWithEmailAndPassword(Email, Passw).catch(function(error) {
		  	// Handle Errors here.
		  	var errorCode = error.code;
		  	var errorMessage = error.message;
		  		 console.log(errorMessage);
			});
*/
	/*
	//Create Application/x-www-form-urlencoded parser
	var urlencoderParser = bodyParser.urlencoded({extend:false});
app.post('/process_post', urlencoderParser, function (req, res){
	response = {
		Email: req.query.lEmail,
		Passw: req.query.lPassW 
	}
	console.log(response);
	res.end(JSON.stringify(response));
})
*/

    //  write a middleware that protectes te app route
function authChecker(req, res, next) {
    if (req.session.username) {
        //res.redirect("/home/" + req.session.username);
        next();
    } else {
        res.redirect("/signin");
    }
}
app.get('/register', function (req, res){
	res.sendFile('register.html');
})
app.get('/forgotpassword', function (req, res){
	res.sendFile('forgotpassword.html');
})
//Listen for request
var server = app.listen(app.get('port'), function(){
//var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Listening at http://%s:%s', host, 
	 port);
})