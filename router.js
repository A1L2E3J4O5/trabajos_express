const express = require('express');

const router = express.Router();

router.get('/',(res,req)=>
{
    res.send('Lista de clientes');
})

router.get('/transactions',(res,req)=>
{
    res.send('trasnsacciones de los clientes')
})

module.exports = router;