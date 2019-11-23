import React, {CSSProperties} from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';

export const homeStyles = {
    appBar: {
        backgroundColor: '#757575'
    },
    root: {
        margin: 0,
        padding: 0
    },
    polyPay: {

    },
    easyWay: {
        margin: '180px auto',
        width: '500px',
        overflow: 'visible',
        textAlign: 'center',
        marginBottom: '50px'
    } as CSSProperties,
    payButtonWrapper: {
        width: '100%'
    },
    payButton: {
        display: 'block',
        fontSize: '40pt',
        textAlign: 'center',
        margin: '0px auto',
        width: '700px',
        height: '300px',
        backgroundColor: '#1565c0',
        borderRadius: '30px'
    } as CSSProperties
};

export const dialogStyles = {
    modal: {
        margin: '0 auto',
        width: '500px'
    }
};