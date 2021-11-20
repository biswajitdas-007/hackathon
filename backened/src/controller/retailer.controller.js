const express = require("express");

const router = express.Router();

const Retailer = require("../model/retailer.model");

router.post("/", async function (req, res) {
    console.log("user: ",Retailer())
     try {
       const retailerdomain = await Retailer.create(req.body);
    return res.send(retailerdomain);
    } catch (error) {
        return res.status(400).send(error.message);
    }
});
router.get("/", async function (req, res) {
    try
    {
        const retailer = await Retailer.find().lean().exec();
        return res.status(201).send(retailer);
    }
    catch (err)
    {
        return res.status(400).send("err4: ",err.message);
    }
})
module.exports = router;