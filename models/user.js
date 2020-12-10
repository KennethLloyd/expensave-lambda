const dynamoose = require('dynamoose');

const userSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = dynamoose.model('User', userSchema);

module.exports = User;
