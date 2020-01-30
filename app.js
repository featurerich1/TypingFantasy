// node app.js
var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/dist/main.js', (req,res)=>{
    res.sendFile(path.join(__dirname + '/dist/main.js'))
});

app.get('/src/ChronoTrigger1000GuardiaForestBG.png', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/ChronoTrigger1000GuardiaForestBG.png'))
});

app.get('/src/chrono.png', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/chrono.png'))
});


app.get('/src/cronobattleleft.gif', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/cronobattleleft.gif'))
});


app.get('/src/Blue_Imp.png', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/Blue_Imp.png'))
});

app.get('/src/chronotype/ChronoType.eot', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/chronotype/ChronoType.eot'))
});
app.get('/src/chronotype/ChronoType.woff', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/chronotype/ChronoType.woff'))
});
app.get('/src/chronotype/ChronoType.ttf', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/chronotype/ChronoType.ttf'))
});
app.get('/src/chronotype/ChronoType.svg', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/chronotype/ChronoType.svg'))
});



app.listen(3000);
