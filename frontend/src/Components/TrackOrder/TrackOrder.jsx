import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import CustomizedSteppers from "../ProgressBar";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Details from "../Details";

const TrackOrders = () => {
    const { productId } = useParams();
    const [item, setItem] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const filterData = (items) => {
        var item = items.filter((product) => {
           return product._id===productId && product
        })
        setItem(item)
}
    async function getData(){
        const response = await axios.get("https://product-delivery-app.herokuapp.com/book")
        const data = response.data;
        setData(data);
        filterData(data);
    }
    
    useEffect(() => {
        setTimeout(function () {
            setIsLoading(false)
        }, 3000);
        getData();
    }, []);
    return (
        <div>
            {isLoading ? <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress color="error" sx={{margin:"0 auto", marginTop:"20%"}}/>
            </Stack> : <div style={{padding:"20px", marginTop:"3%"}}>
                <h1 style={{marginBottom:"5%"}}>Order Status</h1>
                <CustomizedSteppers productId={productId} />
            </div>}
        </div>
    )
}

export default TrackOrders;