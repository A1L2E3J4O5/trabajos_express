const express = require('express');
const listEditRouter = express.Router();

listEditRouter.use((req,res,next)=>
{
    if((req.method === 'POST' || req.method === 'PUT') && !req.body)
        {
            return res.status(400).json({error: "cuerpo de la solicitud vacio"});
        }
    next();
})

listEditRouter.post('/create',(req,res)=>
{
    res.send("creando tarea")
});

listEditRouter.delete('/delete/:taskId',(res,req)=>
{
    const taskId = req.params.taskId;

    res.send('Eliminando una tarea con el ID: ', taskId)
});

listEditRouter.put('/update/:taskId',(req,res)=>
{
    const taskId = req.params.taskId;

    res.send('Actualizando la tarea con el ID: ', taskId)
})

module.exports = listEditRouter;