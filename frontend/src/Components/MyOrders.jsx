import React from 'react'
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import styles from "./MyOrders.module.css";

function MyOrders() {
    const [list, setList] = useState([]);
    async function getData(){
        const response = await axios.get("http://localhost:8000/book")
        const data = response.data;
        setList(data);
        console.log(data);
    }
    useEffect(() => {
        getData();
    }, []);


    
    return (
        <div>
            <h1>Booking Order</h1>
            {list.map((item) => {
               
                return (
                        <div className={styles.box} key={item._id}>
                            <div><h5>Sender Name:</h5>{item.senderName}</div>
                            <div><h5>Sender Address:</h5> {item.senderAddress}</div>
                            <div><h5>Reciever Name:</h5> {item.recieverName}</div>
                            <div><h5>Reciever Address:</h5> {item.recieverAddress}</div>
                            <div><h5>Pickup Time:</h5>{item.pickupTime}</div>
                        <div><h5>Preferable Time:</h5> {item.preferableTime}</div>
                        <Link to={`/myorders/${item._id}`}><button>Track Order</button></Link>
                            
                        </div>
                )
            })}
        </div>
    )
}

export default MyOrders
