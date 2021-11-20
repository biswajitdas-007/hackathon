import React, { useState } from 'react'
import styles from "./DeliveryAgentSignUp.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
const initState = {
    username: "",
    password:"",
    }
function DeliveryAgentSignUp() {
  const [data, setData] = useState(initState);
    const { username, password } = data;
    function handleChange(e)
    {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    const signUp = async (e) => {
        e.preventDefault();
        console.log("data: ", data)
        const response = await axios.post("http://localhost:8000/retailer", data);
    }
    return (
      <div className={styles.body}>
        <h1 className={styles.h}>Delivery Agent Sign Up Form</h1>
        <form action="">
          <p>Name</p>
          <input type="text" placeholder="Enter username" />
          <p>Username</p>
          <input type="text"
                name="username"
                value={username}
                onChange={handleChange} />
          <p>Password</p>
          <input type="text"
                name="password"
                value={password}
                onChange={handleChange} />
          <br />
          <br />
          <Link to={`/deliveryagentlogin`}>
            <button className={styles.btn1} onClick={signUp}>Sign Up</button>
          </Link>
        </form>
      </div>
    );
}

export default DeliveryAgentSignUp
