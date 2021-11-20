import React from 'react'
import { Link } from "react-router-dom";
import styles from "./CustomerLogin.module.css";

function CustomerLogin() {
    return (
      <div className={styles.body}>
        <h1 className={styles.h} >Customer Login Form</h1>
        <p>Username</p>
        <input type="text" placeholder="Enter username" />
        <p>Password</p>
        <input type="password" placeholder="Enter username" />
        <br />
        <br />
        <Link to={`/`}> <button className={styles.btn1} >Login</button> </Link>
        <br />
        <h4>New to Parcel Express? Create an account</h4>
       <Link to={`/customersignup`}> <button className={styles.btn1} >SignUp</button> </Link>

      </div>
    );
}

export default CustomerLogin
