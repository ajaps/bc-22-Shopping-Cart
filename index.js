var express = require('express');
var path = require('path');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index');
});

app.get('/login', function (request, response){
	response.sendFile(path.join(__dirname,'public','login.html'));
});

app.get('/register', function (request, response){
	response.sendFile(path.join(__dirname,'public','register.html'));
});

app.get('/userPage', function (request, response){
	response.sendFile(path.join(__dirname,'public','userPage.html'));
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


