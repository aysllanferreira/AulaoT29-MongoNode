const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const authRouter = require('./routes/auth.routes');

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

app.use('/auth', authRouter);

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGODB_URI;

mongoose
  .connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)))
    .catch((err) => console.log(err.message));