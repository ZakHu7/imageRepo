const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

var db = require('./database');

const ENV = process.env.NODE_ENV || 'dev';
const PORT = process.env.PORT || 5000;

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

// List of api endpoints
app.use('/api/', require('./api/s3'));
app.use('/api/cities', require('./api/cities'));
app.use('/api/weather', require('./api/weather'));

if (ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  })
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
  console.log(`Environment: ${ENV}`);
});

db.query('SELECT NOW()', (err, res) => {
  if (err.error) {
    return console.log(err.error);
  }
  console.log(`PostgreSQL connected: ${res[0].now}.`);
})

module.exports = app;