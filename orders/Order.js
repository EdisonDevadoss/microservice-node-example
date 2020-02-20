const mongoose = require('mongoose');

mongoose.model('Order', {
    //mongoose.SchemaTypes.ObjectId
    CustomerID:{
        type: String,
        required: true,
    },
    BookID:{
        type: String,
        required: true
    },
    initialDate:{
        type: Date,
        required: true
    },
    deliveryDate:{
        type: Date,
        required: true
    }
})