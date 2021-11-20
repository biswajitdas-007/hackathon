import React from 'react'
import styles from "./DeliveryAgentSignUp.module.css";
import { Link } from "react-router-dom";

function DeliveryAgentSignUp() {
    return (
      <div className={styles.body}>
        <h1 className={styles.h}>Delivery Agent Sign Up Form</h1>
        <p>Name</p>
        <input type="text" placeholder="Enter username" />
        <p>Username</p>
        <input type="text" placeholder="Enter username" />
        <p>Password</p>
        <input type="password" placeholder="Enter username" />
        <br />
        <br />
        <Link to={`/deliveryagentlogin`}>
          {" "}
          <button className={styles.btn1}>Sign Up</button>{" "}
        </Link>
      </div>
    );
}

export default DeliveryAgentSignUp
