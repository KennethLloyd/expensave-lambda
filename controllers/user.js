const signUp = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  console.log(email);

  try {
    return res.send({ message: 'Yes!' });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = {
  signUp,
};
