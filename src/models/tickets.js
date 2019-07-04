const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Define a schema
const { Schema } = mongoose;

const TicketSchema = new Schema({
  ticketId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    trim: true,
    required: true,
  },
  created: {
    type: Date,
    trim: true,
    required: true,
  },
  updated: {
    type: Date,
    trim: true,
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  type: {
    type: String,
    trim: true,
    required: true,
  },
  subject: {
    type: String,
    trim: true,
    required: true,
  },
  message: {
    type: String,
    trim: true,
    required: true,
  },
  note: {
    type: String,
    trim: true,
  },
});

TicketSchema.plugin(mongoosePaginate);


export default mongoose.model('Ticket', TicketSchema);
