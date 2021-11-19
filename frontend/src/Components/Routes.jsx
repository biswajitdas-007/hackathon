import React from 'react'
import { Route, Switch } from "react-router-dom";
import Home from './Home';
import MyOrders from './MyOrders';
import Payment from './Payment';
import TrackOrder from './TrackOrder';
function Routes() {
    return (
        <div>
            <Switch>
                <Route exact path="/"><Home/></Route>
                <Route exact path="/myorders"><MyOrders /></Route>
                <Route exact path="/payment/:id"><Payment /></Route>
                <Route exact path="/trackorder"><TrackOrder /></Route>
            </Switch>
        </div>
    )
}

export default Routes
