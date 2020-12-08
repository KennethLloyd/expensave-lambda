const dynamoose = require('dynamoose');

const userSchema = new dynamoose.Schema(
  {
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

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject(); // get raw data

  return userObject;
};

const User = dynamoose.model('User', userSchema);

module.exports = User;
