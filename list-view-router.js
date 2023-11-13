const express = require('express');
const listViewRouter = express.Router();

listViewRouter.get('/completed',(req,res)=>
{
    res.send('Listado tareas completadas')
});

listViewRouter.get('/imcompleted',(req,res)=>
{
    res.send("Listado tareas incompletas")
});

module.exports = listViewRouter;