const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
// const request = require('request');

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/ordersservice", ()=>{
    console.log('Database is connected - order service');
});

require('./Order');
const Order = mongoose.model('Order');

// Will create a new order
app.post("/orders", (req, res)=>{
    //mongoose.Types.ObjectId(req.body.CustomerID)
    const newOrder = {
        CustomerID: req.body.CustomerID,
        BookID: req.body.BookID,
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    };
   const order = new Order(newOrder);

   order.save().then(()=>{
    res.send('Order created')
   }).catch((err)=>{
       if(err){
           throw err;
       }
   })
});

app.get("/orders", (req, res)=>{
    Order.find().then((orders)=>{
        res.json(orders);
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
});

app.get('/orders/:id', (req, res)=>{
    Order.findById(req.params.id).then((order)=>{
        if(order){
        axios.get(`http://localhost:5555/customers/${order.CustomerID}`).then((response)=>{

          const orderObject = {customerName: response.data.name, bookTitle: ''};

          axios.get('http://localhost:4545/books/' + order.BookID).then((response)=>{
              orderObject.bookTitle = response.data.title;
              res.json(orderObject)
          })
        }).catch((err)=>{
            if(err){
                throw err;
            }
        })
    }else{
        res.send("Invalid order");
    }
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
});


app.delete("/orders/:id", (req, res)=>{
    Order.findByIdAndRemove(req.params.id).then(()=>{
        res.send("Order deleted with success!")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})




app.listen(7777, ()=>{
    console.log('Up and running - orders service')
})