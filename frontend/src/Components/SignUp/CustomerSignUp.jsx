import React from 'react'
import { Link } from "react-router-dom";
import styles from "./CustomerSignUp.module.css";

function CustomerSignUp() {
    return (
        <div className={styles.body} >
            <h1 className={styles.h} >Customer Sign Up Form</h1>
        <p>Name</p>
        <input type="text" placeholder="Enter username" />
        <p>Username</p>
        <input type="text" placeholder="Enter username" />
        <p>Password</p>
        <input type="password" placeholder="Enter username" />
            <br />
            <br />
            <Link to={`/customerlogin`}> <button className={styles.btn1} >Sign Up</button> </Link>
          
      </div>
    );
}

export default CustomerSignUp
