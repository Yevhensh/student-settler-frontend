import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import {dialogStyles} from "../../styles/Styles";
import {PayService} from "./PayService";
import {StudentService} from "./StudentService";
import {PaymentDetails} from "./PaymentDetails";
import {PaymentDuration} from './PaymentDuration';
import PaymentSnackbar from "./snackbar/PaymentSnackbar";
import {PaymentDurationResolver} from './PaymentDurationResolver';
import {PaymentDurationLabelResolver} from './PaymentDurationLabelResolver';

interface PaymentProps {
    isModalOpen: boolean,
    toggleModalOpen: () => void
}

export default class PaymentDialog extends Component<PaymentProps> {
    private payService: PayService;
    private studentService: StudentService;

    constructor(props: PaymentProps) {
        super(props);
        this.payService = new PayService();
        this.studentService = new StudentService();

        this.payForDormitory = this.payForDormitory.bind(this);
        this.isStudentExists = this.isStudentExists.bind(this);
    }

    public state  = {
        paymentDetails: PaymentDetails.emptyData(),
        paymentResponseText: '',
        isSnackbarOpen: false,
        isStudentExist: true
    };

    private async payForDormitory() {
        if (!this.isStudentExists()) {
            return;
        }
        
        const paymentResponse = await this.payService.payForDormitory(this.state.paymentDetails);
        this.setState({
            paymentResponseText: paymentResponse.message,
            isSnackbarOpen: true
        });
        setTimeout(() => this.props.toggleModalOpen(), 1500);
    };
    
    private async isStudentExists() {
        const student = this.state.paymentDetails.getStudent();
        if (!student.isDataFilled()) {
            return true;
        }

        const isStudentExist = await this.studentService.isStudentExist(student);
        if (!isStudentExist) {
            this.setState({
                isStudentExist: isStudentExist
            });
        }
        return isStudentExist;
    }

    private getErrorMessageIfStudentNotExist = () => {
        return this.state.isStudentExist
            ? ''
            : "Student with such Name/SurName/Student's Number not exist.";
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
                    {PaymentDurationLabelResolver.resolve(duration)}
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
        this.state.paymentDetails.getStudent().setName(event.target.value);
    };

    private changeSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.paymentDetails.getStudent().setSurName(event.target.value);
    };

    private changeStudentNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.paymentDetails.getStudent().setStudentNumber(event.target.value);
    };

    private changeDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.paymentDetails.setDuration(PaymentDurationResolver.resolve(event.target.value));
    };

    private changeRoomSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.paymentDetails.setRoomNumber(event.target.value);
    }

    private changeDormitorySelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.state.paymentDetails.setDormitoryNumber(Number.parseInt(event.target.value));
    };

    private paymentRepsonse = () => {
        return this.state.paymentResponseText !== "" ? this.displayPaymentSnackbar() : <div/>;
    };

    private displayPaymentSnackbar = () => {
        return <PaymentSnackbar isSnackbarOpen={this.state.isSnackbarOpen} changeOpen={this.changeSnackbarOpen} responseText={this.state.paymentResponseText}/>;
    };

    render(): JSX.Element {
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
                            value={this.state.paymentDetails.getStudent().getName()}
                            autoFocus={true}
                            margin="dense"
                            id="student-name"
                            label="Name"
                            type="email"
                            fullWidth={true}
                            error={!this.state.isStudentExist} 
                            onChange={this.changeStudentName}
                        />
                        <TextField
                            value={this.state.paymentDetails.getStudent().getSurName()}
                            margin="dense"
                            id="student-surname"
                            label="Surname"
                            type="email"
                            fullWidth={true}
                            error={!this.state.isStudentExist} 
                            onChange={this.changeSurname}
                        />
                        <TextField
                            value={this.state.paymentDetails.getStudent().getStudentNumber()}
                            margin="dense"
                            id="student-number"
                            label="Stud. Number"
                            type="email"
                            fullWidth={true}
                            error={!this.state.isStudentExist} 
                            helperText={this.getErrorMessageIfStudentNotExist()}
                            onChange={this.changeStudentNumber}
                        />
                        <TextField
                            value={this.state.paymentDetails.getDormitoryNumber()}
                            id="dormitory-select"
                            select={true}
                            label="Dormitory number"
                            margin="dense"
                            fullWidth={true}
                            onChange={this.changeDormitorySelect}
                        >
                            {this.fetchDormMenuItems()}
                        </TextField>
                        <TextField
                            value={this.state.paymentDetails.getRoomNumber()}
                            id="room-select"
                            select={true}
                            label="Room number"
                            margin="normal"
                            fullWidth={true}
                            onChange={this.changeRoomSelect}
                        >
                            {this.fetchRoomMenuItems()}
                        </TextField>
                        <TextField
                            value={this.state.paymentDetails.getDuration()}
                            id="duration"
                            select={true}
                            label="Duration"
                            margin="normal"
                            fullWidth={true}
                            onChange={this.changeDuration}
                        >
                            {this.fetchDurationSelectItems()}
                        </TextField>
                        <TextField
                            value={this.state.paymentDetails.getPrice()}
                            disabled={true}
                            id="calc-price"
                            label="Price"
                            defaultValue="40 гривень"
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