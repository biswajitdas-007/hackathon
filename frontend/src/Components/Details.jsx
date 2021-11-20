import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import styles from "./Details.module.css";
const Details = ({productId}) => {
    const [item, setItem] = useState([]);
    const [data, setData] = useState([]);
    const [counter, setCounter] = useState("");
    
    function time() {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log("time: ", time);
        setCounter(time)
    }
    const filterData = (items) => {
        var item = items.filter((product) => {
           return product._id===productId && product
        })
        setItem(item)
    }
    async function getData(){
        const response = await axios.get("http://localhost:8000/book")
        const data = response.data;
        setData(data);
        filterData(data);
    }
    //setInterval(time, 1000);
    useEffect( () => {
        getData();
        
    }, []);
    return (
        <div>
            {item.map((el) => {   
                return <div className={styles.container}>
                    <h2 >Product Name : {el.product}</h2>
                    <h2> Receiver : {el.recieverName}</h2>
                    <h3 >Address : {el.senderAddress}</h3>
                </div>
            })}
        </div>
    )
}

export default Details;