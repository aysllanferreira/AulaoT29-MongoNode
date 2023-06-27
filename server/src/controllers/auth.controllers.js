const authService = require('../services/auth.services');

const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email ou Senha em branco' });
  }

  try {
    const user = await authService.signUp({ email, password });

    user.password = undefined;

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email ou Senha em branco' });
  }
  try {
    const { token, user } = await authService.signIn({ email, password });
    res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
};

const me = async (req, res, next) => {
  try {
    const user = await authService.me(req.user.id);

    user.password = undefined;
    
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUp,
  signIn,
  me,
};