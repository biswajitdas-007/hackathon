import React, { useState } from 'react'
import styles from "./DeliveryAgentSignUp.module.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
const initState = {
    username: "",
    password:"",
    }
function DeliveryAgentSignUp() {
  const [data, setData] = useState(initState);
  const [signedUp, setSignedUp] = useState(false);
    const { username, password } = data;
    function handleChange(e)
    {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    const signUp = async (e) => {
        e.preventDefault();
        console.log("data: ", data)
      const response = await axios.post("https://product-delivery-app.herokuapp.com/retailer", data);
      setSignedUp(true)
    }
    return (
      <div className={styles.body}>
        <h1 className={styles.h}>Delivery Agent Sign Up Form</h1>
        <form action="" onSubmit={signUp}>
          <p>Name</p>
          <input type="text" placeholder="Enter username" />
          <p>Username</p>
          <input type="text"
                name="username"
                value={username}
                onChange={handleChange} required/>
          <p>Password</p>
          <input type="text"
                name="password"
                value={password}
                onChange={handleChange} required />
          <br />
          <br />
          {signedUp && <Redirect to="/deliveryagentlogin" />}
          
            <button className={styles.btn1} type="submit">Sign Up</button>
        </form>
      </div>
    );
}

export default DeliveryAgentSignUp
