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
app.get("user/bookings",(res,req)=>
{
    res.send("new booking");
})

app.get("user/reservations",(res,req)=>
{
    res.send("new reservation");
})

app.listen(port,()=>
{
    console.log('Servidor Express escuchando en puerto: ', port);
})