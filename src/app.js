const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const index = require('./routes/index');
const gameLog = require('./routes/gameLogRoute');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', index);
app.use('/gamelog', gameLog);

module.exports = app;