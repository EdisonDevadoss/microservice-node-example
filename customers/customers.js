const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
app.use(bodyParser.json());


mongoose.connect("mongodb://localhost/customerService", ()=>{
    console.log('Database is connected - customer service');
});

require("./Customer");
const Customer = mongoose.model("Customer");


app.post("/customers", (req, res)=>{
    const newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    };
    const customer = new Customer(newCustomer);

    customer.save().then(()=>{
        res.send("Customer created");
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
});

app.get("/customers", (req, res)=>{
    Customer.find().then((customers)=>{
        res.json(customers)
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
});

app.get('/customers/:id', (req, res)=>{
    Customer.findById(req.params.id).then((customer)=>{
        if(customer){
            res.json(customer)
        }else{
            res.send("Invalid ID!")
        }
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
});

app.delete("/customers/:id", (req, res)=>{
    Customer.findByIdAndRemove(req.params.id).then(()=>{
        res.send("Customer deleted with success!")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})


app.listen("5555", ()=>{
    console.log("Up and running - Customers service");
})