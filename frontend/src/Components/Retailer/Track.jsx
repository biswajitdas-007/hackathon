import { useState, useEffect } from "react";
import { useParams } from "react-router";
import io from "socket.io-client";
import axios from "axios";
import styles from "./TrackOrder.module.css"
const Track = () => {
    const { productId } = useParams();
    console.log(useParams())
    console.log(productId);
    const [item, setItem] = useState([]);
    const [data, setData] = useState([]);
    const [placed, setPlaced] = useState(false);
    const [onTheWay, setOnTheWay] = useState(false);
    const [delivered, setDelivered] = useState(false);
    const socket = io.connect("http://localhost:4000");
    const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (message) => {
      console.log("Message5: ", message)
    socket.emit("tracker", { message });
    setMessage("");
  };
    useEffect( () => {
      socket.on("tracker", (payload) => {
          console.log("Payload: ", payload)
        setChat(payload);
    });
    }, []);
    return (
        <div>
            {/* chattyapp */}
            <h1>Chatty app</h1>
        
            <p >
              {chat.message}
            </p>
        <button onClick={() => { sendChat("placed") }}>Placed</button>
        <button onClick={()=>{sendChat("pickedUp")}}>Order Pickedup</button>
        <button onClick={()=>{sendChat("ontheway")}}>Order Dispatch</button>
        <button onClick={() => { sendChat("delivered") }}>Deliverd</button>
        <div>
          <h1>price are</h1>
          <button onClick={() => { sendChat("150") }}>Price: 150</button>
          <button onClick={() => { sendChat("250") }}>Price: 250</button>
          <button onClick={() => { sendChat("350") }}>Price: 350</button>
        </div>
        
        </div>
    )
}

export default Track;