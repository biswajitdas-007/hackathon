import React from 'react'
import { Route, Switch } from "react-router-dom";
import Home from './Home';
import MyOrders from './MyOrders';
import TrackOrders from './TrackOrders';
import Track from './Retailer/Track';

function Routes() {
    return (
        <div>
            <Switch>
                <Route exact path="/"><Home/></Route>
                <Route exact path="/myorders"><MyOrders /></Route>
                <Route path="/myorders/:productId"><TrackOrders /></Route>
                <Route path="/track"><Track/></Route>
            </Switch>
        </div>
    )
}

export default Routes
