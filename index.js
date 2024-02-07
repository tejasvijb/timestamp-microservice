// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// You should provide your own project, not the example URL.
// A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
// A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
// A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
// Your project can handle dates that can be successfully parsed by new Date(date_string)
// If the input date string is invalid, the API returns an object having the structure { error : "Invalid Date" }
// An empty date parameter should return the current time in a JSON object with a unix key
// An empty date parameter should return the current time in a JSON object with a utc key

app.get('/api/:date?', (req, res) => {
    let inputDate = req.params.date;

    if (inputDate) {
        if(!isNaN(inputDate)) {
            res.json({ unix: parseInt(inputDate), utc: new Date(parseInt(inputDate)).toUTCString() });
        }
        else {
            const date = new Date(inputDate);
            if (date.toString() === 'Invalid Date') {
                res.json({ error: 'Invalid Date' });
            }
            else {
                res.json({ unix: date.getTime(), utc: date.toUTCString() });
            }
        }
      
    }
    else {
        res.json({ unix: Date.now(), utc: new Date().toUTCString() }); 
    }
  });


// listen for requests :)
var listener = app.listen(process.env.PORT || 5173, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
