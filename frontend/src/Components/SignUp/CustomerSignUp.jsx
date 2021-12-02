import React, { useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import styles from "./CustomerSignUp.module.css";
import axios from "axios";
const initState = {
    username: "",
    password:"",
    }
function CustomerSignUp() {
    const [data, setData] = useState(initState);
    const { username, password } = data;
    const [signedUp, setSignedUp] = useState(false);
    function handleChange(e)
    {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    const signUp = async (e) => {
        e.preventDefault();
        console.log("data: ", data)
        const response = await axios.post("https://product-delivery-app.herokuapp.com/user", data);
        setSignedUp(true)
    }
    return (
        <div className={styles.body} >
            <h1 className={styles.h} >Customer Sign Up Form</h1>
            <form action="" onSubmit={signUp}>
                <p>Name</p>
                <input placeholder="name: "/>
                <p>Username</p>
                <input type="text"
                name="username"
                value={username}
                onChange={handleChange} placeholder="Set your username" required/>
                <p>Password</p>
                <input type="text"
                name="password"
                value={password}
                    onChange={handleChange} placeholder="Set your password" required />
                {signedUp && <Redirect to="/customerlogin" />}
                <br />
                <br />
                 <button className={styles.btn1} type="submit">Sign Up</button>
            </form>
      </div>
    );
}

export default CustomerSignUp
