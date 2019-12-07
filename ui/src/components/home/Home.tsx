import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {homeStyles} from "../../styles/Styles";
import {Button} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import PaymentDialog from "../payment/PaymentDialog";

interface HomeState {
    isPaymentModalOpen: boolean
}

export default class Home extends Component<{}, HomeState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            isPaymentModalOpen: false
        };
    }

    toggleDialog = () => {
        this.setState({
            isPaymentModalOpen: !this.state.isPaymentModalOpen
        });
    };

    render(): JSX.Element {
        return (
            <div style={homeStyles.root}>
                <AppBar color="primary" position="static" style={homeStyles.appBar}>
                    <Toolbar>
                        <Typography variant="h6" style={homeStyles.polyPay}>Poly Pay</Typography>
                    </Toolbar>
                </AppBar>
                <Typography style={homeStyles.easyWay} variant="h2">Easy way to pay for existence</Typography>
                <div>
                    <Button variant="contained" size="large" color="primary" style={homeStyles.payButton} onClick={this.toggleDialog}>Pay</Button>
                </div>
                <PaymentDialog isModalOpen={this.state.isPaymentModalOpen} toggleModalOpen={this.toggleDialog}/>
            </div>
        );
    }
}