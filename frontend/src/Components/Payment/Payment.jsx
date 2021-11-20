import React from 'react'
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Payment.module.css";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { useContext } from 'react';
import { StateContext } from '../../Context/StateProvider';

function Payment() {
    const params = useParams();
    const { toggleAuth, list , togglePayment} = useContext(StateContext);
    const [product, setProduct] = useState([]);
    const [price, setPrice] = useState();
    const socket = io.connect("http://localhost:4000");
    const handlePayment = () => {
        list.map((item) => {
            return item._id===product._id ? togglePayment(item._id):console.log('Bye35343')
        })
        toggleAuth(true)
    }
    useEffect(() => {
        getData();
         socket.on("tracker", (payload) => {
            console.log("PaymentPayload: ", payload)
            if (payload.message === "150") {
                setPrice(150)
            }else if (payload.message === "250") {
                setPrice(250)
            }
            else if (payload.message === "350") {
                setPrice(350)
            }
        });
    }, []);
     async function getData() {
         const { data }  = await axios.get(`http://localhost:8000/book/${params.id}`);
     console.log(data);
    setProduct(data);
  }
    return (
        <div>
            <h1>Payment Page</h1>
            {price > 0 && <h3>Amount to be paid: {price}</h3> }
            <div className={styles.MainContainer}>
            <div className={styles.box}>
            <div className={styles.insideBox}><b>Details of the product</b></div>
            <div className={styles.insideBox}><b>Product to be delivered:</b>{product.product}</div>
            <div className={styles.insideBox}><b>Receiver Name:</b><span>{product.recieverName}</span></div>
            <div className={styles.insideBox}><b>Reciever Address:</b>{product.recieverAddress}</div>
            <div className={styles.insideBox}><b>Approx pickup Time:</b>{product.pickupTime}</div>
            <div className={styles.insideBox}><b>Apporox delivery Time:</b>{product.preferableTime}</div>
            </div>
            <div className={styles.MainCont}>
                <h3>Pay with Credit/Debit Card</h3>
                <p className={styles.txtdec}>Your card Number is kept 100% secure and only used for this transaction</p>
                <div>
                    <div className={styles.payAcc}>
                        <p><b>Cards Accepted</b></p>
                    </div>
                    <div className={styles.disImg}>
                        <img className={styles.img1} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="/" />
                        <img className={styles.img1} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png" alt="/" />
                    </div>
                    <div className={styles.det}>
                        <div className={styles.lable}>
                        <lable>Card Number: </lable>
                        <input className={styles.inp1} type="text" placeholder="Enter Card Number" />
                        </div>
                    <br />
                    <br/>
                    <div className={styles.lable}>
                        <lable>Expiry Date: </lable>
                        <input className={styles.inp2} type="text" placeholder="MM/YY" />
                    </div>
                    <br />
                    <br />
                    <div className={styles.lable}>
                        <lable>CVV: </lable>
                        <input className={styles.inp3} type="text" placeholder="Enter CVV" />
                    </div>
                    <br />
                    <br />
                    <button className={styles.but} onClick={handlePayment}><Link to={`/myorders`} style={{ textDecoration: 'none' }}>Pay Now</Link></button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Payment
