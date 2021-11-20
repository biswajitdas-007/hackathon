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
            <div className={styles.MainContainer}>
            <div className={styles.box}>
            <div className={styles.insideBox}><b>Details of the product</b></div>
            <div className={styles.insideBox}><b>Product to be delivered:</b>{product.product}</div>
            {/* <div><h5>Sender Name:</h5>{product.senderName}</div>
            <div><h5>Sender Address:</h5>{product.senderAddress}</div> */}
            <div className={styles.insideBox}><b>Receiver Name:</b><span>{product.recieverName}</span></div>
            <div className={styles.insideBox}><b>Reciever Address:</b>{product.recieverAddress}</div>
            <div className={styles.insideBox}><b>Approx pickup Time:</b>{product.pickupTime}</div>
            <div className={styles.insideBox}><b>Apporox delivery Time:</b>{product.preferableTime}</div>
                {/* <div className={styles.insideBox}><b>Size and Price:</b>{product.sizePrice}</div> */}
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
                    {/* <Link to={`/trackorder`}><button className={styles.but}>Pay for Order</button></Link> */}
                    <button className={styles.but}><Link to={`/trackorder`} style={{ textDecoration: 'none' }}>Pay Now</Link></button>
                    </div>
                    
                </div>

            </div>

        </div>
        </div>
    )
}

export default Payment
