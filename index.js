const express = require('express');
const app = express();
const port = 3000;


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

app.listen(port,()=>
{
    console.log('Servidor Express escuchando en puerto: ', port);
})