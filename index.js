const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());
app.use(bodyParser.json());

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

const tasks = [
  {
    id: 1,
    description: 'Hacer la compra',
    completed: false,
  },
  {
    id: 2,
    description: 'Preparar la presentación',
    completed: true,
  },
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.completed);
  res.json(completedTasks);
});

app.get('/tasks/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.completed);
  res.json(incompleteTasks);
});

app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  res.json(task);
});

app.post('/tasks', (req, res) => {
  const { description } = req.body;
  const newTask = {
    id: tasks.length + 1,
    description,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  task.description = req.body.description || task.description;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === taskId);

  if (index === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  const deletedTask = tasks.splice(index, 1);
  res.json({ message: 'Tarea eliminada con éxito', deletedTask });
});

app.use('/list-view', verifyToken, listViewRouter);
app.use('/list-edit', verifyToken, listEditRouter);

app.listen(port, () => {
  console.log('Servidor Express escuchando en puerto:', port);
});
