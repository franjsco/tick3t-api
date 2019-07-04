const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const CategorySchema = new Schema({
  type: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  value: {
    type: String,
  },
});

export default mongoose.model('categories', CategorySchema);
