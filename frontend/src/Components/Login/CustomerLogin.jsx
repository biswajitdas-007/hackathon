import React, { useContext, useEffect, useState, useRef } from 'react'
import { Link, Redirect } from "react-router-dom";
import styles from "./CustomerLogin.module.css";
import axios from "axios";
import { StateContext } from '../../Context/StateProvider';
const initState = {
    username: "",
    password:"",
}
function CustomerLogin() {
  const [userNames, setUserNames] = useState([]);
  const [data, setData] = useState(initState);
  const { username, password } = data;
  const { toggleCustomerAuth, customerAuth } = useContext(StateContext);
  function handleChange(e)
    {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
  }
  const handleLogin = () => {
    var isCorrect = userNames.filter((user) => {
     if ((user.username == data.username) && (user.password == data.password)) {
       return true;
     } else {
       return false;
      } 
    })
    if (isCorrect.length > 0) {
      toggleCustomerAuth()
    } else {
      alert("Wrong credentials !!!")
    }
  }
  const getData = async() => {
    const response = await axios.get("https://product-delivery-app.herokuapp.com/user")
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
        {customerAuth && <Redirect to="/"/> }
        <Link to={`${customerAuth?"/":"/customerlogin"}`}> <button className={styles.btn1} onClick={handleLogin} >Login</button> </Link>
        <br />
        <h4>New to Parcel Express? Create an account</h4>
       <Link to={`/customersignup`}> <button className={styles.btn1} >SignUp</button> </Link>

      </div>
    );
}

export default CustomerLogin
