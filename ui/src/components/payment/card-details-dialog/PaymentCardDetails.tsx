import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import ChangeLinkButton from "../payment-dialog/ChangeLinkButton";
import {Button, DialogContent} from "@material-ui/core";
import {PayService} from "../../model/PayService";
import {StudentDetails} from "../StudentDetails";
import {StringUtils} from "../../../util/StringUtils";
import {dialogStyles} from "../../../styles/Styles";
import PaymentSnackbar from "../snackbar/PaymentSnackbar";
import CardDetails from "../CardDetails";
import {PaymentDetails} from "../PaymentDetails";
import {LocationDescriptorObject} from "history";

export interface PaymentCardDetailsProps {
    location: LocationDescriptorObject
}

interface PaymentCardDetailsState {
    studentDetails: StudentDetails,
    cardDetails: CardDetails,
    isOpen: boolean,
    focus: string,
    paymentResponseMessage: string,
    isSnackbarOpen: boolean,
    isPaymentSuccessful: boolean,
    goBackButtonName: string,
    goBackButtonColor: string,
    isFormValid: boolean
}

export default class PaymentCardDetails extends Component<PaymentCardDetailsProps, PaymentCardDetailsState> {
    private payService: PayService;

    constructor(props: PaymentCardDetailsProps) {
        super(props);
        this.payService = new PayService();

        this.state = {
            studentDetails: props.location.state,
            cardDetails: CardDetails.emptyData(),
            isOpen: true,
            focus: '',
            paymentResponseMessage: '',
            isSnackbarOpen: false,
            isPaymentSuccessful: false,
            goBackButtonName: 'Cancel',
            goBackButtonColor: 'secondary',
            isFormValid: true
        };
    }

    private changeFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        this.setState({focus: event.target.name});
    };

    private changeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        this.setState((prevState) => {
            prevState.cardDetails[name] = value;
            return prevState;
        });
    };

    private changeTextFieldWithLength = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, length: number) => {
        const {name, value} = event.target;
        this.setState((prevState) => {
            prevState.cardDetails[name] = this.validateNumberAndSlice(value, length);
            return prevState;
        });
    };

    private validateNumberAndSlice = (value: string, length: number) => {
        if (value.length == 0) {
            return '';
        }

        const lastSymbol = value.charAt(value.length - 1);
        return isNaN(parseInt(lastSymbol))
            ? value.slice(0, value.length - 1)
            : value.slice(0, length);
    };

    private changeExpirationDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        this.setState((prevState) => {
            prevState.cardDetails.expirationDate = this.validateAndParseExpirationDate(event.target.value);
            return prevState;
        });
    };

    private validateAndParseExpirationDate = (value: string) => {
        const date = this.validateNumberAndSlice(value, 4);
        if (this.isMonthStartsWithNotValidNumber(date)) {
            return '';
        }
        if (this.isDateValidIfMonthStartsWithZero(date)) {
            return '0';
        }
        if (this.isDateValidIfMonthStartsWithOne(date)) {
            return '1';
        }

        return this.isNotZeroYear(date)
            ? date.slice(0, 3)
            : date;
    };

    private isMonthStartsWithNotValidNumber = (date: string): boolean => {
        return date.charAt(0) != '0' && date.charAt(0) != '1';
    };

    private isDateValidIfMonthStartsWithZero = (date: string): boolean => {
        return date.charAt(0) == '0' && date.charAt(1) == '0';
    };

    private isDateValidIfMonthStartsWithOne = (date: string): boolean => {
        const start = date.charAt(0);
        const end = date.charAt(1);
        return start == '1' && end != '0' && end != '1' && end != '2';
    };

    private isNotZeroYear = (date: string): boolean => {
        return date.length == 4 && date.charAt(3) == '0';
    };

    private payForDormitory = async () => {
        if (this.isFormValid()) {
            this.doPayAndDisplayResponse();
        }
    };

    private doPayAndDisplayResponse = async () => {
        const {cardDetails, studentDetails} = this.state;
        const paymentDetails = new PaymentDetails(studentDetails.student.studentNumber, cardDetails);
        const paymentResponse = await this.payService.payForDormitory(paymentDetails);
        this.setState({
            paymentResponseMessage: paymentResponse.message,
            isSnackbarOpen: true,
            isPaymentSuccessful: true,
            goBackButtonName: 'Go Home',
            goBackButtonColor: 'primary'
        });
    };

    private displayPaymentSnackbar = () => {
        return (
            <PaymentSnackbar
                isSnackbarOpen={this.state.isSnackbarOpen}
                changeOpen={this.changeSnackbarOpen}
                responseText={this.state.paymentResponseMessage}
            />
        );
    };

    private changeSnackbarOpen = (isOpen: boolean) => {
        this.setState({
            isSnackbarOpen: isOpen
        });
    };

    private isFormValid = () => {
        const isFormFilled = this.state.cardDetails.isDataFilled();
        this.setState({
            isFormValid: isFormFilled
        });

        return isFormFilled;
    };

    private getErrorMessageIfFieldEmpty = (value: string): string => {
        return this.isFieldEmpty(value)
            ? 'This field is required.'
            : '';
    };

    private getErrorMessageIfFieldNotFullFilled = (value: string, length: number) => {
        if (this.getErrorMessageIfFieldEmpty(value) != '') {
            return this.getErrorMessageIfFieldEmpty(value);
        }

        return this.isFieldNotFullFilled(value, length)
            ? 'This field should be full filled.'
            : '';
    };

    private isFieldEmpty = (value: string): boolean => {
        return !this.state.isFormValid && StringUtils.isEmpty(value);
    };

    private isFieldNotFullFilled = (value: string, length: number): boolean => {
        return !this.state.isFormValid && value.length < length;
    };

    private getConfirmButtonIfPaymentNotCompleted = () => {
        return !this.state.isPaymentSuccessful
            ? this.displayConfirmButton()
            : null;
    };

    private displayConfirmButton = () => {
        return (
            <Button onClick={this.payForDormitory} color="primary">
                Confirm
            </Button>
        );
    };

    render() {
        const {focus, isPaymentSuccessful} = this.state;
        const {cardNumber, ownerName, expirationDate, cvc} = this.state.cardDetails;

        return (
            <div id="PaymentForm">
                <Dialog style={dialogStyles.modal} open={this.state.isOpen} aria-labelledby='card-details-title'>
                    <DialogTitle id='card-details-title'>Card Details</DialogTitle>
                    <DialogContent>
                        <Cards
                            number={cardNumber}
                            name={ownerName}
                            expiry={expirationDate}
                            cvc={cvc}
                            focused={focus}
                        />
                        <TextField
                            id='card-number-field'
                            name='cardNumber'
                            label='Card number'
                            required={true}
                            disabled={isPaymentSuccessful}
                            value={cardNumber}
                            margin='normal'
                            fullWidth={true}
                            error={this.isFieldNotFullFilled(cardNumber, 16)}
                            helperText={this.getErrorMessageIfFieldNotFullFilled(cardNumber, 16)}
                            onChange={(e) => this.changeTextFieldWithLength(e, 16)}
                            onFocus={this.changeFocus}
                        />
                        <TextField
                            id='owner-name-field'
                            name='ownerName'
                            label='Owner name'
                            required={true}
                            disabled={isPaymentSuccessful}
                            value={ownerName}
                            margin='normal'
                            fullWidth={true}
                            error={this.isFieldEmpty(ownerName)}
                            helperText={this.getErrorMessageIfFieldEmpty(ownerName)}
                            onChange={this.changeTextField}
                            onFocus={this.changeFocus}
                        />
                        <TextField
                            id='expiry-field'
                            name='expirationDate'
                            label='Expiration date'
                            required={true}
                            disabled={isPaymentSuccessful}
                            value={expirationDate}
                            margin='normal'
                            fullWidth={true}
                            error={this.isFieldNotFullFilled(expirationDate, 4)}
                            helperText={this.getErrorMessageIfFieldNotFullFilled(expirationDate, 4)}
                            onChange={this.changeExpirationDate}
                            onFocus={this.changeFocus}
                        />
                        <TextField
                            id='cvc-field'
                            name='cvc'
                            label='CVC'
                            required={true}
                            disabled={isPaymentSuccessful}
                            value={cvc}
                            margin='normal'
                            fullWidth={true}
                            error={this.isFieldNotFullFilled(cvc, 3)}
                            helperText={this.getErrorMessageIfFieldNotFullFilled(cvc, 3)}
                            onChange={(e) => this.changeTextFieldWithLength(e, 3)}
                            onFocus={this.changeFocus}
                        />
                        <DialogActions>
                            {this.getConfirmButtonIfPaymentNotCompleted()}
                            <ChangeLinkButton
                                buttonName={this.state.goBackButtonName}
                                link="/"
                                color={this.state.goBackButtonColor}
                            />
                        </DialogActions>
                        {this.displayPaymentSnackbar()}
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}