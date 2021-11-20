const express = require("express");

const router = express.Router();

const User = require("../model/customer.model");

router.post("/", async function (req, res) {
    console.log("user: ",User())
     try {
       const userdomain = await User.create(req.body);
    return res.send(userdomain);
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

router.get("/", async function (req, res) {
    try
    {
        const users = await User.find().lean().exec();
        return res.status(201).send(users);
    }
    catch (err)
    {
        return res.status(400).send("err4: ",err.message);
    }
})
module.exports = router;