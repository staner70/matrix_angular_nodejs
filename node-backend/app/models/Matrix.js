const mongoose = require('mongoose');
const { Schema } = mongoose;


const MatrixSchema = new Schema({
    calcul:  {
        type: String,
        // required: [true,"Please provide a name"]
    }, 
    resultat : {
        type: Number
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
  });

module.exports = mongoose.model("Matrix", MatrixSchema)