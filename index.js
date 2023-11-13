const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const app = express();
const port = process.env.PORT || 3000;


dotenv.config();

app.use(express.json());


const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];


app.post('/login', (req, res) => {
  const { username, password } = req.body;


  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }


  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });


  res.json({ token });
});

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

app.use('/list-view', verifyToken, listViewRouter);
app.use('/list-edit', verifyToken, listEditRouter);

app.listen(port, () => {
  console.log('Servidor Express escuchando en puerto:', port);
});
