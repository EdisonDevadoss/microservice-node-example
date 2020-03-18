// Load express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.json());


app.get('/', (req, res)=>{
    res.send('This is our main endpoint!')
});

app.get('/books', (req, res)=>{
    axios.get('http://localhost:4545/books').then((response)=>{
        res.json(response.data)
    }).catch((err)=>{
        res.json({error: err.message})
    })
});


app.listen(5000, ()=>{
    console.log('Up and running ! -- 5000')
})