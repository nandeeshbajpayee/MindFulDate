const mongoose = require('mongoose');

// Define confess schema
const confessSchema = new mongoose.Schema({
    to: [{ type: String }],
    
    by: { type: String , required: true }
});

// Create confess model
const Confess = mongoose.model('Confess', confessSchema);

module.exports = Confess;
