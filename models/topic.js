var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var TopicSchema = new Schema({
  // `title` is required and of type String
  topic: {
    type: String,
    required: true
  },
  // `link` is required and of type String
});

// This creates our model from the above schema, using mongoose's model method
var Topic = mongoose.model("Topic", TopicSchema);

// Export the Article model
module.exports = Topic;