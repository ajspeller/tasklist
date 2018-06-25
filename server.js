const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var port = 4200;
var app = express();

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// set static folder, where the angular front-end files will leave
app.use(express.static(path.join(__dirname, 'client')));

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/', index);
app.use('/api', tasks);

app.listen(port, () => {
  console.log(`Server stared on port .. ${port}`);
});


