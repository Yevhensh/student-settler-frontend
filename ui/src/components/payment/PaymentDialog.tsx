import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { dialogStyles } from "../../styles/Styles";
import { PayService } from "./PayService";
import { StudentService } from "./StudentService";
import { PaymentDetails } from "./PaymentDetails";
import { PaymentDuration } from './PaymentDuration';
import PaymentSnackbar from "./snackbar/PaymentSnackbar";
import { PaymentDurationResolver } from './PaymentDurationResolver';
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

    private fetchDurationSelectItems = () => {
        const durations = [PaymentDuration.HALF_YEAR, PaymentDuration.YEAR];
        return durations.map(duration => {
            return (
                <MenuItem key={duration} value={duration}>
                    {PaymentDurationResolver.resolveLabel(duration)}
                </MenuItem>
            )
        });
    };

    private fetchRoomMenuItems = () => {
        return ["1", "2", "3", "4", "5"].map(num => (
            <MenuItem key={num} value={num}>
                {num}
            </MenuItem>
        ));
    };

    private fetchDormMenuItems = () => {
        return ["1", "2", "3", "4", "5"].map(num => (
            <MenuItem key={num} value={num}>
                {num}
            </MenuItem>
        ));
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
            prevState.paymentDetails.setDormitoryNumber(Number.parseInt(event.target.value));
            return prevState;
        });
    };

    private changeRoomSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        this.setState((prevState) => {
            prevState.paymentDetails.setRoomNumber(event.target.value);
            return prevState;
        });
    }

    private changeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        this.setState((prevState) => {
            prevState.paymentDetails.setDuration(PaymentDurationResolver.resolve(event.target.value));
            return prevState;
        });
    };

    private paymentRepsonse = () => {
        return this.state.paymentResponseText !== "" ? this.displayPaymentSnackbar() : <div />;
    };

    private displayPaymentSnackbar = () => {
        return <PaymentSnackbar isSnackbarOpen={this.state.isSnackbarOpen} changeOpen={this.changeSnackbarOpen} responseText={this.state.paymentResponseText} />;
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
        const duration = this.emptyIfNull(this.state.paymentDetails.getDuration());

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
                        <TextField
                            value={dormitoryNumber}
                            id="dormitory-select"
                            select={true}
                            label="Dormitory number"
                            margin="dense"
                            fullWidth={true}
                            required={true}
                            error={this.isFieldEmpty(dormitoryNumber)}
                            helperText={this.getErrorMessageIfFieldEmpty(dormitoryNumber)}
                            onChange={this.changeDormitorySelect}
                        >
                            {this.fetchDormMenuItems()}
                        </TextField>
                        <TextField
                            value={roomNumber}
                            id="room-select"
                            select={true}
                            label="Room number"
                            margin="normal"
                            fullWidth={true}
                            required={true}
                            error={this.isFieldEmpty(roomNumber)}
                            helperText={this.getErrorMessageIfFieldEmpty(roomNumber)}
                            onChange={this.changeRoomSelect}
                        >
                            {this.fetchRoomMenuItems()}
                        </TextField>
                        <TextField
                            value={duration}
                            id="duration"
                            select={true}
                            label="Duration"
                            margin="normal"
                            fullWidth={true}
                            required={true}
                            error={this.isFieldEmpty(duration)}
                            helperText={this.getErrorMessageIfFieldEmpty(duration)}
                            onChange={this.changeDuration}
                        >
                            {this.fetchDurationSelectItems()}
                        </TextField>
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
                            Pay
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