const express = require('express');

const router = express.Router();

const Book = require('../model/bookmodel');

router.post("/", async function (req, res) {
    try {
        const booking = await Book.create(req.body)
        return res.status(200).send(booking);
    }
    catch (err)
    {
        console.log(err);
        return res.status(400).send(err.message);
    }
})

router.get("/", async function (req, res) {
    try
    {
        const bookings = await Book.find().lean().exec();
        return res.status(201).send(bookings);
    }
    catch (err)
    {
        return res.status(400).send(err.message);
    }
})

router.get("/:id", async function (req, res) {
    try
    {
        const bookings = await Book.findById(req.params.id).lean().exec();
        return res.status(201).send(bookings);
    }
    catch (err)
    {
        return res.status(400).send(err.message);
    }
})

router.delete("/:id", async function (req, res) {
    try {
        const bookings = await Book.findByIdAndDelete(req.params.id).lean();
     return res.status(200).send(bookings);
    } catch {
        return res.status(400).send(err.message);
    }
    
})

module.exports = router;