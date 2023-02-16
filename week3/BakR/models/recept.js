var mongoose = require('mongoose');
const { Schema } = mongoose;

const receptSchema = new Schema({
  naam:  String, // String is shorthand for {type: String}
  chef: String,
  uitleg:   String,
  ingrediënten: [{ body: String, hoeveelheid: Schema.Types.Mixed  }],
});

mongoose.model('recept', receptSchema);