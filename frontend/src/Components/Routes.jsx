import React from 'react'
import { Route, Switch } from "react-router-dom";
import Home from './Home/Home';
import MyOrders from './MyOrders/MyOrders';
import CustomerLogin from './Login/CustomerLogin';
import DeliveryAgentLogin from './Login/DeliveryAgentLogin';
import Payment from './Payment/Payment';
import CustomerSignUp from './SignUp/CustomerSignUp';
import DeliveryAgentSignUp from './SignUp/DeliveryAgentSignUp';
import TrackOrder from './TrackOrder/TrackOrder';
import Track from './Retailer/Track';
function Routes() {
    return (
        <div>
            <Switch>
                <Route exact path="/"><Home/></Route>
                <Route exact path="/myorders"><MyOrders /></Route>
                <Route exact path="/myorders/:productId"><TrackOrder /></Route>
                <Route exact path="/track"><Track /></Route>
                <Route exact path="/payment/:id"><Payment /></Route>
                <Route exact path="/trackorder"><TrackOrder /></Route>
                <Route exact path="/customerlogin"> <CustomerLogin /> </Route>
                <Route exact path="/deliveryagentlogin"> <DeliveryAgentLogin /> </Route>
                <Route exact path="/customersignup"> <CustomerSignUp /> </Route>
                 <Route exact path="/deliveryagentsignup"> <DeliveryAgentSignUp /> </Route>
            </Switch>
        </div>
    )
}

export default Routes
