const mongoose = require('mongoose');

let CinemaSchema = new mongoose.Schema({
    area:String,
    seats: {
        rows: String,
        columns: String
      },
    movies: 
    { type : Array , 
     "default" : [] }
    });

const Cinema = mongoose.model('Cinema', CinemaSchema);
module.exports = Cinema;

