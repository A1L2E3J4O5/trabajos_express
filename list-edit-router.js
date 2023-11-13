const express = require('express');
const listEditRouter = express.Router();

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