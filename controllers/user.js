const uuid = require('uuid');
const cognito = require('../lib/cognito');
const { User } = require('../models');

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    await cognito.signUp(email, password);

    const user = new User({
      id: uuid.v4(),
      firstName,
      lastName,
      email,
    });

    console.log(user);

    await user.save();

    return res.send({ message: 'Successfully registered' });
  } catch (e) {
    console.log(e);

    if (e.status) {
      return res.status(e.status).send({ error: e.message });
    }

    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await cognito.signIn(email, password);

    return res.send({ message: 'Successfully logged in', user: response });
  } catch (e) {
    if (e.status) {
      return res.status(e.status).send({ error: e.message });
    }

    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = {
  signUp,
  logIn,
};
