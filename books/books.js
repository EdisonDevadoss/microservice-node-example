// Load express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Load mongoose
const mongoose = require('mongoose');

require('./Book');
const Book =  mongoose.model('Book');

// Connect
mongoose.connect("mongodb://localhost/library", ()=>{
    console.log('Database is connected!');
});

app.get('/', (req, res)=>{
    res.send('This is our main endpoint!')
});

//Create func
app.post('/books', (req, res)=>{
    console.log('req', req.body);
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    };
    // Create a new Book
    const book = new Book(newBook);

    book.save().then(()=>{
        console.log('New book created')
    }).catch((err)=>{
        if(err){
            throw err
        }
    });
    res.send('New book created with success!')

});

app.get('/books', (req, res)=>{
    Book.find().then((books)=>{
        res.json(books)
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
});

app.get('/books/:id', (req, res)=>{
    Book.findById(req.params.id).then((book)=>{
        if(book){
            // Book data
            res.json(book);
        }else{
            res.sendStatus(404);
        }
    }).catch(err =>{
        if(err){
            throw err;
        }
    });
});

app.delete("/books/:id", (req, res)=>{
    Book.findByIdAndRemove(req.params.id).then(()=>{
        res.send("Book removed")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})

app.listen(4545, ()=>{
    console.log('Up and running ! -- This is our books service')
})