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
app.get("/clientes/:id",(res,req)=>
{
    const clientid = req.params.id;
})

app.listen(port,()=>
{
    console.log('Servidor Express escuchando en puerto: ', port);
})