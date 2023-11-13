const express = require('express');
const app = express();
const port = 3000;
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const task = [
    {
        id: '123456',
        isCompleted: false,
        descripcion: "walk the dog"
    },
]
app.get('/task', (req, res) => {
    res.json(task);
  });

app.use('/list-view', listViewRouter);
app.use('/list-edit',listEditRouter);

app.listen(port,()=>
{
    console.log('Servidor Express escuchando en puerto: ', port);
})