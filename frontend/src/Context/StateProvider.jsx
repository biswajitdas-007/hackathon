import { createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

const StateProvider = ({children}) => {
    const [isAuth, setAuth] = useState(false);
    const [customerAuth, setCustomerAuth] = useState(false);
    const [deliveryAuth, setDeliveryAuth] = useState(false);
    const [list, setList] = useState([]);
    const toggleAuth = (token) => {
        if (token) {
            setAuth(true)
        }
    }
    
    async function getData(){
        const response = await axios.get("http://localhost:8000/book")
        const data = response.data;
        setList(data);
        console.log(data);
    }
    useEffect(() => {
        getData()
    }, [])
    const togglePayment = (id) => {
        list.map((item) => {
            return item._id == id ? item.payment = true : item
        })
    }
    const toggleCustomerAuth = (token) => {
        customerAuth ? setCustomerAuth(!customerAuth) : setCustomerAuth(!customerAuth);
    }
    const toggleDeliveryAuth = (token) => {
        customerAuth ? setDeliveryAuth(!deliveryAuth) : setDeliveryAuth(!deliveryAuth);
    }
    const value = { isAuth, toggleAuth, customerAuth, toggleCustomerAuth, list, togglePayment, deliveryAuth, toggleDeliveryAuth };
    return (
        <StateContext.Provider value={value}>{children}</StateContext.Provider>
    )
}

export { StateContext, StateProvider };