import React, {Component} from 'react';
import Home from "../components/home/Home";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PaymentCardDetails from "../components/payment/card-details-dialog/PaymentCardDetails";

export default class App extends Component<{}, {}> {
    render(): JSX.Element {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/" exact={true} component={Home} />
                        <Route path="/payment/card-details" component={PaymentCardDetails}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}