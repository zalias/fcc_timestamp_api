var express = require('express');
var moment = require('moment');
var app = express();

app.get('/', function (req, res) {
  var result = {
  //return simple Page with Instructions (Use PUG)
  }
  res.send(result);
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
    result.natural = moment(eTime).format(naturalFormat);
  }
  res.send(result);
});

app.listen(process.env.PORT || 8080, process.env.IP, function () {
  console.log('App listening at ', process.env.PORT  + ":" + process.env.IP);
});
