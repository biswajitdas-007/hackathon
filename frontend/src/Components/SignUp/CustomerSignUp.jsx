import React, { useState } from 'react'
import { Link } from "react-router-dom";
import styles from "./CustomerSignUp.module.css";
import axios from "axios";
const initState = {
    username: "",
    password:"",
    }
function CustomerSignUp() {
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
        const response = await axios.post("http://localhost:8000/user", data);
    }
    return (
        <div className={styles.body} >
            <h1 className={styles.h} >Customer Sign Up Form</h1>
            <form action="" >
                <p>Name</p>
                <input placeholder="name: "/>
                <p>Username</p>
                <input type="text"
                name="username"
                value={username}
                onChange={handleChange}/>
                <p>Password</p>
                <input type="text"
                name="password"
                value={password}
                onChange={handleChange} />
                 <Link to={`/customerlogin`}> <button className={styles.btn1}  onClick={signUp}>Sign Up</button> </Link>
            </form>
            <br />
            <br />
           
          
      </div>
    );
}

export default CustomerSignUp
