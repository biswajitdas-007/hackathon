import React from 'react'
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { StateContext } from '../../Context/StateProvider';
import styles from "./MyOrders.module.css";
function MyOrders() {
     const params = useParams();
    const { isAuth, listFilter, updateList } = useContext(StateContext);
    const [list, setList] = useState([]);
    //const [data, setData] = useState([]);
    console.log("list: ", list)
    
    const handleCancel = (id) => {
        axios.delete(`http://localhost:8000/book/${id}`)
         .then(res=>{
             const del = list.filter(item => id !== item._id)
             updateList(del);
             setList(del);
         })
    }
    async function getData(){
        const response = await axios.get("http://localhost:8000/book")
        const data = response.data;
        setList(data);
    }
    useEffect(() => {
        getData()
    },[])
    return (
            <>
            <h1>Active Slots</h1>
            <div className={styles.mainCont}>
                {list && list.map((item) => {
                console.log("items:23: ",item)
                return (
                    <>
                        <div className={styles.box} key={item._id}>
                            <div><b>PRODUCT : </b>{item.product}</div><br />
                        <div className={styles.insideBox}><b>SENDER NAME : </b> {item.senderName}</div><br />
                        <div className={styles.insideBox}><b>SENDER ADDRESS : </b> {item.senderAddress}</div><br />
                        <div className={styles.insideBox}><b>RECIEVER NAME : </b> {item.recieverName}</div><br />
                        <div className={styles.insideBox}><b>RECIEVER ADDRESS : </b> {item.recieverAddress}</div><br />
                        <div className={styles.insideBox}><b>PICKUP TIME : </b> {item.pickupTime}</div><br />
                            <div className={styles.insideBox}><b>PREFERABLE TIME : </b> {item.preferableTime}</div><br />
                            {/* <div><b>SizePrice:</b> {item.sizePrice}</div> */}
                            <div className={styles.butCont}>
                                {console.log("auth: ", isAuth)}
                                <button className={styles.but}>{item.payment ? <Link to={`/myorders/${item._id}`} className={styles.payTxt}>Track</Link> : <Link to={`/payment/${item._id}`} className={styles.payTxt}>Payment</Link>}</button>
                            <button onClick={()=>handleCancel(item._id)}className={styles.but2}><Link to={`/myorders`} className={styles.payTxt}>Cancel Order</Link></button>
                            </div>
                            </div>
                    </>
                )
            })}
        </div>
        </>
    )
}

export default MyOrders
