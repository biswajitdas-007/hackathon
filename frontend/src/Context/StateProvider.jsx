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
    const getData = async()=>{
        
            const response = await axios.get("https://product-delivery-app.herokuapp.com/book")
            const data = response.data;
            setList(data);
    
    }
    // async function getData(){
    //     const response = await axios.get("http://localhost:8000/book")
    //     const data = response.data;
    //     setList(data);
    // }
    const getItems = () => {
        return list;
    }
    useEffect(() => {
        getData()
    }, [])
    const togglePayment = (id) => {
        axios.put(`https://product-delivery-app.herokuapp.com/book/${id}`,{payment:true})
            .then(res => {
                console.log("updtedRes: ", res);
         })
        list.map((item) => {
            return item._id == id ? item.payment = true : item
        })
    }
    const orderCancel = (id) => {
        axios.delete(`https://product-delivery-app.herokuapp.com/book/${id}`)
         .then(res=>{
             const del = list.filter(item => id !== item._id)
            setList(del)
         })
    }
    const listFilter = (id) => {
        axios.delete(`https://product-delivery-app.herokuapp.com/book/${id}`)
         .then(res=>{
             const del = list.filter(item => id !== item._id)
             setList(del)
         })
        
        
    }
    const updateList = (data) => {
        setList(data)
    }
    const toggleCustomerAuth = (token) => {
        customerAuth ? setCustomerAuth(!customerAuth) : setCustomerAuth(!customerAuth);
    }
    const toggleDeliveryAuth = (token) => {
        customerAuth ? setDeliveryAuth(!deliveryAuth) : setDeliveryAuth(!deliveryAuth);
    }
    const value = { isAuth, toggleAuth, customerAuth, toggleCustomerAuth, list, togglePayment, deliveryAuth, toggleDeliveryAuth, listFilter,getItems, updateList, getData };
    return (
        <StateContext.Provider value={value}>{children}</StateContext.Provider>
    )
}

export { StateContext, StateProvider };