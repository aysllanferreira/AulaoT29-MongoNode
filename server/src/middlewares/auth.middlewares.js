const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/auth.models');

dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    // Bearer ewqiugbvhhbj423y893478239842947
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) throw new Error('Usuario nao encontrado');

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token Invalido' });
  }
};

module.exports = {
  verifyToken,
};