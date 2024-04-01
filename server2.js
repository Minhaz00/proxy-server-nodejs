
var express = require('express');
var app = express();

app.get('/*', function(req, res){
    res.send('Welcome from server 2');
})

app.listen(9016, (req, res) => {
    console.log('Server is running on port 9016');
})


