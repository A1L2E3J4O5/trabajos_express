const express = require('express');
const app = express();
const port = 3000;
const clients = require('./router.js')

app.use('/clients', clients)

const task = [
    {
        id: '123456',
        isCompleted: false,
        descripcion: "walk the dog"
    },
]
app.get("user/bookings",(res,req)=>
{
    res.send("new booking");
})

app.get("user/reservations",(res,req)=>
{
    res.send("new reservation");
})

app.get("/clientes/:id",(res,req)=>
{
    const clientid = req.params.id;
})

app.listen(port,()=>
{
    console.log('Servidor Express escuchando en puerto: ', port);
})