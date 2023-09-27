const express = require('express');
const app = express();

//routes
app.get('/', function(req, res){
    res.send('Hello World');
});

app.listen(3000, function(){
    console.log('listening on 3000');
});