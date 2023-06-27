/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/auth.models');

dotenv.config();

const signUp = async (userData) => {
  const senhaCriptografada = await bcrypt.hash(userData.password, 10);
  const user = new User({ email: userData.email, password: senhaCriptografada });
  return user.save();
};

const signIn = async (userData) => {
  const user = await User.findOne({ email: userData.email });
  if (!user) throw new Error('Usuario nao encontrado');

  const isValidPassword = await bcrypt.compare(userData.password, user.password);
  if (!isValidPassword) throw new Error('Usuario ou senha esta invalido');

  user.password = undefined;

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });

  return { token, user };
};

const me = (userId) => User.findById(userId);

// multer

module.exports = {
  signUp,
  signIn,
  me,
};