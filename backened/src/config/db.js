const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect("mongodb+srv://Parcel:EYJ1THkz9RqHni6U@cluster0.rvfjg.mongodb.net/ParcelExpress?retryWrites=true&w=majority")
}

module.exports = connect;