import React from 'react'
import { useEffect, useState, useContext} from 'react'
import { Link, Redirect } from "react-router-dom";
import { StateContext } from '../../Context/StateProvider';
import axios from "axios";
import styles from "./DeliveryAgentLogin.module.css";
const initState = {
    username: "",
    password:"",
}
function DeliveryAgentLogin() {
  const [userNames, setUserNames] = useState([]);
  const [data, setData] = useState(initState);
  const { toggleDeliveryAuth, deliveryAuth } = useContext(StateContext);
    const { username, password } = data;
  function handleChange(e)
    {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
  }
  const handleLogin = () => {
    let auth = false;
    userNames.map((user) => {
       if (user.username === data.username && user.password === data.password) {
         toggleDeliveryAuth();
         auth = true;
      } 
    })
    if (!auth) {
      alert('Wrong credentials !!!')
    }
  }
  const getData = async() => {
    const response = await axios.get("https://product-delivery-app.herokuapp.com/retailer")
        const data = response.data;
        setUserNames(data)
  }
  useEffect(() => {
    getData();
  },[])
    return (
      <div className={styles.body}>
        <h1 className={styles.h}>Delivery Agent Login Form</h1>
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
        {deliveryAuth && <Redirect to="/track"/> }
        <Link to={`/deliveryagentlogin`}> <button className={styles.btn1} onClick={handleLogin} >Login</button> </Link>
        <br />
        <h4>New to Parcel Express? Create an account</h4>
        <Link to={`/deliveryagentsignup`}> <button className={styles.btn1} >SignUp</button> </Link>
      </div>
    );
}

export default DeliveryAgentLogin
