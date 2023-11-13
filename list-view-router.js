const express = require('express');
const listViewRouter = express.Router();

listViewRouter.use((req,res,next)=>
{
    const requireParam = req.query.requireParam;
    if (!requireParam)
    {
        return res.status(400).json({error: "parametro requerido no proporcionado"});
    }
    next();
})

listViewRouter.get('/completed',(req,res)=>
{
    res.send('Listado tareas completadas')
});

listViewRouter.get('/imcompleted',(req,res)=>
{
    res.send("Listado tareas incompletas")
});

module.exports = listViewRouter;