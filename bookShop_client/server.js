"user strict";
var express = require("express");
var app = express();
var path = require("path");

//MIDDLEWARE TO DEFINE FOLDERS OR IMAGES
app.use(express.static('public'));

app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(3000, function(){
    console.log('server listening on 3000')
})
