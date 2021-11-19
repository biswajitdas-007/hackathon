import React from 'react'
import { Route, Switch } from "react-router-dom";
import Home from './Home';
import MyOrders from './MyOrders';


function Routes() {
    return (
        <div>
            <Switch>
                <Route exact path="/"><Home/></Route>
                <Route exact path="/myorders"><MyOrders/></Route>
            </Switch>
        </div>
    )
}

export default Routes
