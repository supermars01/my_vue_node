const mongoose = require('mongoose');
const {Schema} = mongoose;
// Create Schema
const BusinessSchema = new Schema({
  title: {
    type: String
  },
  sub_title: {
    type: String
  },
  jindu: {
    type: String,
    // required: true
  },
  weidu: {
    type: String,
    // required: true
  },
  address: {
    type: String,
   
  },
  content: {
    type: String
  },
  category: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
console.log(mongoose.model('business', BusinessSchema))
module.exports.Business = mongoose.model('business', BusinessSchema);