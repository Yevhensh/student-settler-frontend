import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { dialogStyles } from "../../styles/Styles";
import { PayService } from "./PayService";
import { StudentService } from "./StudentService";
import { PaymentDetails } from "./PaymentDetails";
import PaymentSnackbar from "./snackbar/PaymentSnackbar";
import { StringUtils } from '../../util/StringUtils';
import { ValidateDTO } from './ValidateDTO';

interface PaymentProps {
    isModalOpen: boolean,
    toggleModalOpen: () => void
}

interface PaymentState {
    paymentDetails: PaymentDetails,
    price: Number,
    paymentResponseText: string,
    isSnackbarOpen: Boolean,
    isStudentPresent: Boolean,
    errorMessageIfStudentNotPresent: string,
    isFormFilled: Boolean
}

export default class PaymentDialog extends Component<PaymentProps, PaymentState> {
    private readonly FIELD_IS_REQUIRED_MESSAGE: String = 'This field is required';

    private payService: PayService;
    private studentService: StudentService;

    constructor(props: PaymentProps) {
        super(props);
        this.payService = new PayService();
        this.studentService = new StudentService();

        this.payForDormitory = this.payForDormitory.bind(this);
        this.isStudentPresent = this.isStudentPresent.bind(this);
    }

    public state = {
        paymentDetails: PaymentDetails.emptyData(),
        price: null,
        paymentResponseText: '',
        isSnackbarOpen: false,
        isStudentPresent: true,
        errorMessageIfStudentNotPresent: '',
        isFormFilled: true
    };

    private async payForDormitory() {
        this.isFormValid()
            .then((valid) => valid && this.doPayAndDisplayResponse());
    };

    private async doPayAndDisplayResponse() {
        const paymentResponse = await this.payService.payForDormitory(this.state.paymentDetails);
        this.setState({
            paymentResponseText: paymentResponse.message,
            isSnackbarOpen: true
        });
        setTimeout(() => this.props.toggleModalOpen(), 1500);
    }

    private async isFormValid() {
        if (!this.updateFormFilledState()) {
            this.resetStudentPresentState();
            return false;
        }

        const validationResult = await this.isStudentPresent();
        return this.updateStudentPresentState(validationResult);
    }

    private updateFormFilledState = () => {
        const isFormFilled = this.state.paymentDetails.isDataFilled();
        this.setState({
            isFormFilled: isFormFilled
        });

        return isFormFilled;
    }

    private resetStudentPresentState = () => {
        this.setState({
            isStudentPresent: true,
            errorMessageIfStudentNotPresent: ''
        })
    }

    private async isStudentPresent() {
        const student = this.state.paymentDetails.getStudent();
        return await this.studentService.isStudentPresent(student);
    }

    private updateStudentPresentState = (validationResult: ValidateDTO): boolean => {
        this.setState({
            isStudentPresent: validationResult.success,
            errorMessageIfStudentNotPresent: validationResult.failMessage
        });

        return validationResult.success;
    }

    private getErrorMessageIfStudentNotExist = (value: string) => {
        const formNotFilledMessage = this.getErrorMessageIfFieldEmpty(value);
        if (formNotFilledMessage) {
            return formNotFilledMessage;
        }

        return this.state.isStudentPresent
            ? ''
            : this.state.errorMessageIfStudentNotPresent;
    }

    private getErrorMessageIfFieldEmpty = (value: string) => {
        return !this.isFieldEmpty(value)
            ? ''
            : this.FIELD_IS_REQUIRED_MESSAGE;
    }

    private isFieldEmpty = (value: string) => {
        return !this.state.isFormFilled && StringUtils.isEmpty(value);
    }

    private changeSnackbarOpen = (isOpen: boolean) => {
        this.setState({
            isSnackbarOpen: isOpen
        });
    };

    private fetchMonthsCountItems = () => {
        return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    };

    private fetchRoomMenuItems = () => {
        return ["1", "2", "3", "4", "5"];
    };

    private fetchDormMenuItems = () => {
        return ["1", "2", "3", "4", "5"];
    };

    private changeStudentName = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        this.setState((prevState) => {
            prevState.paymentDetails.getStudent().setName(event.target.value);
            return prevState;
        });
    };

    private changeSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        this.setState((prevState) => {
            prevState.paymentDetails.getStudent().setSurname(event.target.value);
            return prevState;
        });
    };

    private changeStudentNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        this.setState((prevState) => {
            prevState.paymentDetails.getStudent().setStudentNumber(event.target.value);
            return prevState;
        });
    };

    private changeDormitorySelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        this.setState((prevState) => {
            prevState.paymentDetails.setDormitoryNumber(this.parseNumberFromAutoselect(event));
            return prevState;
        });
    };

    private changeRoomSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        this.setState((prevState) => {
            prevState.paymentDetails.setRoomNumber(event.target.textContent);
            return prevState;
        });
    }

    private changeMonthsCount = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        this.setState((prevState) => {
            prevState.paymentDetails.setMonthsCount(this.parseNumberFromAutoselect(event));
            return prevState;
        });
    };

    private parseNumberFromAutoselect = (event: React.ChangeEvent<HTMLInputElement>) => {
        return StringUtils.isNotEmpty(event.target.textContent)
            ? Number.parseInt(event.target.textContent)
            : null;
    }

    private paymentRepsonse = () => {
        return this.state.paymentResponseText !== "" ? this.displayPaymentSnackbar() : <div />;
    };

    private displayPaymentSnackbar = () => {
        return <PaymentSnackbar isSnackbarOpen={this.state.isSnackbarOpen} changeOpen={this.changeSnackbarOpen} responseText={this.state.paymentResponseText} />;
    };

    private renderTextFieldForAutoselect = (params, label: string, value: string) => {
        return (
            <TextField
                {...params}
                value={value}
                label={label}
                margin="normal"
                fullWidth={true}
                required={true}
                error={this.isFieldEmpty(value)}
                helperText={this.getErrorMessageIfFieldEmpty(value)}
            />
        );
    };

    private emptyIfNull = (value: any): string => {
        return value ? value.toString() : '';
    }

    render(): JSX.Element {
        const name = this.emptyIfNull(this.state.paymentDetails.getStudent().getName());
        const surName = this.emptyIfNull(this.state.paymentDetails.getStudent().getSurname());
        const studentNumber = this.emptyIfNull(this.state.paymentDetails.getStudent().getStudentNumber());
        const dormitoryNumber = this.emptyIfNull(this.state.paymentDetails.getDormitoryNumber());
        const roomNumber = this.emptyIfNull(this.state.paymentDetails.getRoomNumber());
        const monthsCount = this.emptyIfNull(this.state.paymentDetails.getMonthsCount());

        return (
            <div>
                <Dialog
                    open={this.props.isModalOpen}
                    style={dialogStyles.modal}
                    onClose={this.props.toggleModalOpen}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="payment-form-title">Payment form</DialogTitle>
                    <DialogContent>
                        <TextField
                            value={name}
                            autoFocus={true}
                            margin="dense"
                            id="student-name"
                            label="Name"
                            type="text"
                            fullWidth={true}
                            required={true}
                            error={!this.state.isStudentPresent || this.isFieldEmpty(name)}
                            helperText={this.getErrorMessageIfFieldEmpty(name)}
                            onChange={this.changeStudentName}
                        />
                        <TextField
                            value={surName}
                            margin="dense"
                            id="student-surname"
                            label="Surname"
                            type="text"
                            fullWidth={true}
                            required={true}
                            error={!this.state.isStudentPresent || this.isFieldEmpty(surName)}
                            helperText={this.getErrorMessageIfFieldEmpty(surName)}
                            onChange={this.changeSurname}
                        />
                        <TextField
                            value={studentNumber}
                            margin="dense"
                            id="student-number"
                            label="Stud. Number"
                            type="text"
                            fullWidth={true}
                            required={true}
                            error={!this.state.isStudentPresent || this.isFieldEmpty(studentNumber)}
                            helperText={this.getErrorMessageIfStudentNotExist(studentNumber)}
                            onChange={this.changeStudentNumber}
                        />
                        <Autocomplete
                            id="dormitory-select"
                            value={dormitoryNumber}
                            options={this.fetchDormMenuItems()}
                            onChange={this.changeDormitorySelect}
                            renderInput={params => this.renderTextFieldForAutoselect(params, "Dormitory number", dormitoryNumber)}
                        />
                        <Autocomplete
                            id="room-select"
                            value={roomNumber}
                            options={this.fetchRoomMenuItems()}
                            onChange={this.changeRoomSelect}
                            renderInput={params => this.renderTextFieldForAutoselect(params, "Room number", roomNumber)}
                        />
                        <Autocomplete
                            id="monthsCount-select"
                            value={monthsCount}
                            options={this.fetchMonthsCountItems()}
                            onChange={this.changeMonthsCount}
                            renderInput={params => this.renderTextFieldForAutoselect(params, "Amount of months", monthsCount)}
                        />
                        <TextField
                            value={this.emptyIfNull(this.state.price)}
                            disabled={true}
                            id="calc-price"
                            label="Price"
                            margin="normal"
                            fullWidth={true}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.payForDormitory} color="primary">
                            Confirm
                        </Button>
                        <Button onClick={this.props.toggleModalOpen} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                {this.paymentRepsonse()}
            </div>
        );
    }
}