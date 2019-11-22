import React, {Component} from 'react';

interface PaymentProps {
    isOpen: boolean
}

export default class PaymentModal extends Component<PaymentProps, {}> {
    constructor(props: PaymentProps) {
        super(props);
        this.state = {};
    }

    render(): JSX.Element {
        return (
            <div>
                {/*<SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose}/>*/}
            </div>
        );
    }
}