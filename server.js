var express = require('express');
var moment = require('moment');
var pug = require('pug');

var app = express();


app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


app.get('/', function (req, res) {
  var result = {
    unix : moment().unix(),
    natural: moment().format("MMMM DD, YYYY")
  }
  console.log(result);
  res.render('index.pug', result);
});

app.get('/:inputDate', function(req, res) {
  var inputDate = req.params.inputDate;
  var eTime = parseInt(inputDate);
  
  var naturalFormat = "MMMM DD, YYYY";
  var result = {
    "unix" : null,
    "natural" : null
  };

  if (moment(inputDate, naturalFormat, true).isValid()) {
    result.unix = Date.parse(inputDate) / 1000;
    result.natural = inputDate;
  }
  else if (eTime) {
    result.unix = eTime;
    result.natural = moment(eTime * 1000).format(naturalFormat);
  }
  res.send(result);
});

app.listen(process.env.PORT || 8080, function () {
  console.log('App listening at ', process.env.PORT);
});
