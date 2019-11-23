import React, {Component, SyntheticEvent} from 'react';
import Snackbar, {SnackbarOrigin} from "@material-ui/core/Snackbar";
import {PaymentSnackbarContentWrapper} from "./PaymentSnackbarContentWrapper";

interface Props {
    isSnackbarOpen: boolean,
    changeOpen: (b: boolean) => void,
    responseText: string
}

export default class PaymentSnackbar extends Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    private handleClose(event?: SyntheticEvent, reason?: string) {
        if (reason === 'clickaway') {
            return;
        }
        this.props.changeOpen(false);
    };

    render(): JSX.Element {
        const snackbarLocation: SnackbarOrigin = {
            vertical: 'bottom',
            horizontal: 'left',
        };
        return (
            <div>
                <Snackbar
                    anchorOrigin={snackbarLocation}
                    open={this.props.isSnackbarOpen}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                >
                    <PaymentSnackbarContentWrapper
                        onClose={this.handleClose}
                        variant="success"
                        message={this.props.responseText}
                    />
                </Snackbar>
            </div>
        );
    }
}