import React from 'react'
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from "../Images/logo.png";
import mapIcon from "../Images/mapsIcon.png";
import mail from "../Images/mail.jpg"
import styles from "./Home.module.css";

function Home() {
    const initState = {
        product: "",
        senderName: "",
        senderAddress: "",
        recieverName: "",
        recieverAddress: "",
        pickupTime: "",
      preferableTime: "",
      payment: false,
        // sizePrice:""
    }
    const [data, setData] = useState(initState);
    
    const { product, senderName, senderAddress, recieverName, recieverAddress,
    pickupTime, preferableTime } = data;
    function handleChange(e)
    {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

     function handleSubmit(e)
    {
      e.preventDefault();
      const response =  axios.post("http://localhost:8000/book", data).then(res => console.log("eres: ",res)).catch(err => console.log(err));
      setData(initState);
      alert("Your order is sucessfully booked, Go to My Orders section");
    }

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.name}>
            <p>Parcel</p>
            <img src={Logo} alt="/" />
          </div>

          <div className={styles.location}>
            <img src={mapIcon} alt="/" />
            <p>Hyderabad, India</p>
          </div>

          <div className={styles.mail}>
            <img src={mail} alt="" />
            <p>info@parcelexpress.in</p>
          </div>
        </div>

        <div className={styles.menubar}>
          <button>HOME</button>
          <button>ABOUT US</button>
          <button>CONTACT US</button>
          <Link to={`/myorders`}>
            <button className={styles.btn}>MY ORDERS</button>
          </Link>
          <Link to={`/customerlogin`}>
            <button className={styles.btn}>CUSTOMER LOGIN</button>
          </Link>
          <Link to={`deliveryagentlogin`}>
            <button className={styles.btn}>DELIVERY AGENT LOGIN</button>
          </Link>
        </div>

        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            <div className={styles.inp}>
              <label>Product :</label>
              <input
                type="text"
                name="product"
                value={product}
                onChange={handleChange}
                placeholder="Enter your product"
              />
              <br />
              <label>Sender name : </label>
              <input
                type="text"
                name="senderName"
                value={senderName}
                onChange={handleChange}
                placeholder="Enter sender name"
              />
              <br />
              <label>Sender Address : </label>
              <input
                type="text"
                name="senderAddress"
                value={senderAddress}
                onChange={handleChange}
                placeholder="Enter sender address"
              />
              <br />
              <label>Receiver Name : </label>
              <input
                type="text"
                name="recieverName"
                value={recieverName}
                onChange={handleChange}
                placeholder="Enter reciever name"
              />
              <br />
              <label>Receiver Address :</label>
              <input
                type="text"
                name="recieverAddress"
                value={recieverAddress}
                onChange={handleChange}
                placeholder="Enter reciever Address"
              />
              <br />
              <label>Pickup Time : </label>
              <input
                type="text"
                name="pickupTime"
                value={pickupTime}
                onChange={handleChange}
                placeholder="Enter Pick-up Time"
              />
              <br />
              <label>Prefarable Time : </label>
              <input
                type="text"
                name="preferableTime"
                value={preferableTime}
                onChange={handleChange}
                placeholder="Enter preferable delivery time"
              />
              <br />
              <input className={styles.submit} type="submit" value="Book" />
            </div>
          </form>
        </div>
      </div>
    );
}

export default Home

