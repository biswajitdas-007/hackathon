import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import styles from "./CustomerLogin.module.css";
import axios from "axios";

const initState = {
    username: "",
    password:"",
}
const routes = {
  home: "/"
}
function CustomerLogin() {
  const [userNames, setUserNames] = useState([]);
  const [data, setData] = useState(initState);
  const [auth, setAuth] = useState(false);
    const { username, password } = data;
  function handleChange(e)
    {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
  }
  const handleLogin = () => {
    console.log(data, userNames)
    userNames.map((user) => {
      return user.username == data.username && user.password == data.password ? setAuth(true): alert("Wrong Credentials")
    })
  }
  const getData = async() => {
    const response = await axios.get("http://localhost:8000/user")
        const data = response.data;
        setUserNames(data)
  }
  useEffect(() => {
    getData();
  },[])
    return (
      <div className={styles.body}>
        <h1 className={styles.h} >Customer Login Form</h1>
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
        {auth ? <Link to={`/`}> <button className={styles.btn1} onClick={handleLogin} >Login</button> </Link> :<Link to={`/customerlogin`}> <button className={styles.btn1} onClick={handleLogin} >Login</button> </Link> }
        <br />
        <h4>New to Parcel Express? Create an account</h4>
       <Link to={`/customersignup`}> <button className={styles.btn1} >SignUp</button> </Link>

      </div>
    );
}

export default CustomerLogin
