import React from 'react'
import { Redirect, useParams } from "react-router";
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
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const socket = io.connect("http://localhost:4000");
    const handlePayment = () => {
        list.map((item) => {
            return item._id===product._id ? togglePayment(item._id):console.log('Bye35343')
        })
        toggleAuth(true)
        setPaymentSuccess(true);
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
         const { data }  = await axios.get(`https://product-delivery-app.herokuapp.com/book/${params.id}`);
     console.log(data);
    setProduct(data);
  }
    return (
        <div className={styles.container}>
            <div className={styles.MainContainer}>
            <div className={styles.box}>
                <div className={styles.insideBox}>Product to be delivered:<b>{product.product}</b></div>
                <div className={styles.insideBox}>Receiver Name:<b><span>{product.recieverName}</span></b></div>
                <div className={styles.insideBox}>Reciever Address:<b>{product.recieverAddress}</b></div>
                <div className={styles.insideBox}>Approx pickup Time:<b>{product.pickupTime}</b></div>
                <div className={styles.insideBox}>Apporox delivery Time:<b>{product.preferableTime}</b></div>
            </div>
            <div className={styles.MainCont}>
                <h3>Pay with Credit/Debit Card</h3>
                <p className={styles.txtdec}><mark>Your card Number is kept 100% secure and only used for this transaction</mark></p>
                <div>
                    <div className={styles.payAcc}>
                        <p><b>Cards Accepted</b></p>
                    </div>
                    <div className={styles.disImg}>
                        <img className={styles.img1} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="/" />
                        <img className={styles.img1} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png" alt="/" />
                    </div>
                        <form action="" onSubmit={handlePayment}>
                            
                        <lable>Card Number: </lable>
                        <input className={styles.inp1} type="text" placeholder="Enter Card Number" required/>
                        <br />
                        <lable>Expiry Date: </lable>
                        <input className={styles.inp2} type="text" placeholder="MM/YY" required />
                            <br />
                        <lable>CVV: </lable>
                        <input className={styles.inp3} type="text" placeholder="Enter CVV" required/>
                            <br />
                        {price > 0 && <div className={styles.lable}>
                            <lable>Amount: </lable>
                                    <input className={styles.inp4} type="text" defaultValue={price} disabled/>
                            </div>
                            }
                            {paymentSuccess && <Redirect to="/myorders"/>}
                    <button type="submit" className={styles.but}>Pay Now</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Payment
