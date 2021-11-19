const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    product : { type: String, required: true },
    senderName: { type: String, required: true },
    senderAddress: { type: String, required: true },
    recieverName: { type: String, required: true },
    recieverAddress: { type: String, required: true },
    pickupTime: { type: String, required: true },
    preferableTime: { type: String, required: true },
    sizePrice : {
            type: String,
            enum: ['small--₹100', 'medium--₹150', 'Large--₹200'],
            required : true 
        }
}, {
    versionKey: false
})

const Book = new mongoose.model("book", bookSchema);

module.exports = Book;