
var express = require('express');
var app = express();

app.get('/*', function(req, res){
    res.send('Welcome to server 1');
})

app.listen(9015, () => {
    console.log('Server is running on port 9015');
})


