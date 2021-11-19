import React from 'react'
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Payment.module.css";
import { Link } from "react-router-dom";

function Payment() {
    const params = useParams();
    const [product, setProduct] = useState([]);
    
     useEffect(() => {
    getData();
     }, []);
    
     async function getData() {
         const { data }  = await axios.get(`http://localhost:8000/book/${params.id}`);
     console.log(data);
    setProduct(data);
  }
    return (
        
        <div>
            <h1>Payment Page</h1>
            <div className={styles.box}>
            <div><h5>Product:</h5>{product.product}</div>
            <div><h5>Sender Name:</h5>{product.senderName}</div>
            <div><h5>Sender Address:</h5>{product.senderAddress}</div>
            <div><h5>Receiver Name:</h5>{product.recieverName}</div>
            <div><h5>Reciever Address:</h5>{product.recieverAddress}</div>
            <div><h5>PickUp Time:</h5>{product.pickupTime}</div>
            <div><h5>Preferable Time:</h5>{product.preferableTime}</div>
                <div><h5>Size Price:</h5>{product.sizePrice}</div>
            </div>
        
            <div>
                <h3>Pay with Credit/Debit Card</h3>
                <p>Your card Number is kept 100% secure and only used for this transaction</p>
                <div>
                    <div>
                        <p>Cards Accepted</p>
                    </div>
                    <div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="/" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png" alt="/" />
                    </div>
                    <lable>Card Number:</lable>
                    <input type="text" placeholder="Enter Card Number" />
                    <br />
                    <br/>
                     <lable>Expiry Date:</lable>
                    <input type="text" placeholder="MM/YY" />
                    <br />
                    <br />
                    <lable>CVV:</lable>
                    <input type="text" placeholder="Enter CVV" />
                    <br />
                    <br />
                    <Link to={`/trackorder`}><button>Pay for Order</button></Link>
                    
                </div>

            </div>

        </div>
    )
}

export default Payment
