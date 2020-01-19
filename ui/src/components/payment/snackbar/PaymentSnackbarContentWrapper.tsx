import React from 'react';
import {Theme} from "@material-ui/core";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {amber, green} from "@material-ui/core/colors";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

const wrapperSnackbarStyles = makeStyles((theme: Theme) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

export const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

export interface PaymentProps {
    className?: string;
    message?: string;
    onClose?: () => void;
    variant: string;
}

export const PaymentSnackbarContentWrapper = (props: PaymentProps) => {
    const classes = wrapperSnackbarStyles(props);
    const {className, message, onClose, variant} = props;
    const Icon = variantIcon[variant];

    function snackbarMessage() {
        return (
            <span id="client-snackbar" className={classes.message}>
              <Icon className={clsx(classes.icon, classes.iconVariant)}/>
                {message}
            </span>
        );
    }

    function fetchActions() {
        return [
            (
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon}/>
                </IconButton>
            ),
        ];
    }

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={snackbarMessage()}
            action={fetchActions()}
        />
    );
};