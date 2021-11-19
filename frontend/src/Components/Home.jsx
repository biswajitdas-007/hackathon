import React from 'react'
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Home() {
    const initState = {
        senderName: "",
        senderAddress: "",
        recieverName: "",
        recieverAddress: "",
        pickupTime: "",
        preferableTime:""
    }
    const [data, setData] = useState(initState);
    
    const { senderName, senderAddress, recieverName, recieverAddress,
    pickupTime, preferableTime } = data;
    function handleChange(e)
    {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    async function handleSubmit(e)
    {
        e.preventDefault();
        const response = await axios.post("http://localhost:8000/book", data);
    }

    return (
        <div>
            <h1>Parcel Express</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="senderName" value={senderName} onChange={handleChange} placeholder="Enter sender name" />
            <br />
            <input type="text" name="senderAddress" value={senderAddress} onChange={handleChange} placeholder="Enter sender address" />
            <br />
            <input type="text" name="recieverName"  value={recieverName} onChange={handleChange} placeholder="Enter reciever name" />
            <br />
            <input type="text" name="recieverAddress"  value={recieverAddress} onChange={handleChange} placeholder="Enter reciever Address" />
            <br />
            <input type="text" name="pickupTime" value={pickupTime} onChange={handleChange} placeholder="Enter Pick-up Time" />
            <br />
            <input type="text" name="preferableTime" value={preferableTime} onChange={handleChange} placeholder="Enter preferable delivery time" />
            <br />
                <br />
                <input type="submit" value="Book" />
            
            </form>

            <Link to={`myorders/`}><button>My Orders</button></Link>
        </div>
    )
}

export default Home

