const db = require('../database');

class Cities {
  static getAll(callback) {
    db.query('SELECT city_name from cities', (err, res) => {
      if (err.error) {
        return callback(null, err);
      }
      callback(res);
    })
  }

  static create(city, callback) {
    db.query('INSERT INTO cities (city_name) VALUES ($1)', [city], (err, res) => {
      if (err.error) {
        return callback(null, err);
      }
      callback(res);
    })
  }
}

module.exports = Cities;