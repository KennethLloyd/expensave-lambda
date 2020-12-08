const cognito = require('../lib/cognito');

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const response = await cognito.signUp(email, password);

    return res.send({ message: 'Successfully registered' });
  } catch (e) {
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
