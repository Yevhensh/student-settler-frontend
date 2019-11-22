import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {homeStyles} from "../../styles/Styles";
import {Button} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

export default class Home extends Component<{}, {}> {
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
                    <Button variant="contained" size="large" color="primary" style={homeStyles.payButton}>Pay</Button>
                </div>
            </div>
        );
    }
}

