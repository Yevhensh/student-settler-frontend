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
import {Payment} from "./Payment";
import PaymentSnackbar from "./snackbar/PaymentSnackbar";

interface PaymentProps {
    isModalOpen: boolean,
    toggleModalOpen: () => void
}

enum Duration {
    HALF_A_YEAR = "HALF_A_YEAR",
    YEAR = "YEAR"
}

interface PaymentState {
    name: string,
    surname: string,
    studentNumber: number,
    dormitoryNumber: number,
    roomNumber: number,
    duration: Duration,
    price: number,
    paymentResponseText: string,
    isSnackbarOpen: boolean
}

export default class PaymentDialog extends Component<PaymentProps, PaymentState> {
    public state: PaymentState = {
        name: "test",
        surname: "test",
        studentNumber: 2611619234,
        dormitoryNumber: 1,
        roomNumber: 2,
        duration: Duration.HALF_A_YEAR,
        price: 500,
        paymentResponseText: "",
        isSnackbarOpen: false
    };
    private payService: PayService;

    constructor(props: PaymentProps) {
        super(props);
        this.payService = new PayService();
        this.changeStudentName = this.changeStudentName.bind(this);
        this.changeSurname = this.changeSurname.bind(this);
        this.changeDuration = this.changeDuration.bind(this);
        this.changeRoomSelect = this.changeRoomSelect.bind(this);
        this.changeDormitorySelect = this.changeDormitorySelect.bind(this);
        this.changeStudentNumber = this.changeStudentNumber.bind(this);
        this.payForDormitory = this.payForDormitory.bind(this);
        this.changeSnackbarOpen = this.changeSnackbarOpen.bind(this);
    }

    private async payForDormitory() {
        const payment = new Payment(this.state.name, this.state.surname, this.state.studentNumber, this.state.dormitoryNumber, this.state.roomNumber);
        const paymentResponse = await this.payService.payForDormitory(payment);
        this.setState({
            paymentResponseText: paymentResponse.message,
            isSnackbarOpen: true
        });
        setTimeout(() => this.props.toggleModalOpen(), 1500);
    };

    private changeSnackbarOpen(isOpen) {
        this.setState({
            isSnackbarOpen: isOpen
        });
    }

    private fetchDurationSelectItems() {
        const durations = [Duration.HALF_A_YEAR, Duration.YEAR];
        return durations.map(dur => {
            const duration = dur.toString();
            return (
                <MenuItem key={duration} value={duration}>
                    {duration}
                </MenuItem>
            )
        });
    };

    private fetchRoomMenuItems() {
        return [1, 2, 3, 4, 5].map(num => (
            <MenuItem key={num} value={num}>
                {num}
            </MenuItem>
        ));
    }

    private fetchDormMenuItems() {
        return [1, 2, 3, 4, 5].map(num => (
            <MenuItem key={num} value={num}>
                {num}
            </MenuItem>
        ));
    }

    private changeStudentName(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            name: event.target.value
        })
    }

    private changeSurname(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            surname: event.target.value
        })
    }

    private changeDuration(event: React.ChangeEvent<HTMLInputElement>) {
        const dur = event.target.value == "HALF_A_YEAR" ? Duration.HALF_A_YEAR : Duration.YEAR;
        this.setState({
            duration: dur
        })
    }

    private changeRoomSelect(event: React.ChangeEvent<HTMLInputElement>) {
        const roomNumber = parseInt(event.target.value);
        this.setState({
            roomNumber: roomNumber
        })
    }

    private changeDormitorySelect(event: React.ChangeEvent<HTMLInputElement>) {
        const dormitoryNumber = parseInt(event.target.value);
        this.setState({
            dormitoryNumber: dormitoryNumber
        })
    }

    private changeStudentNumber(event: React.ChangeEvent<HTMLInputElement>) {
        const studentNumber = parseInt(event.target.value);
        this.setState({
            studentNumber: studentNumber
        })
    }

    private paymentRepsonse() {
        return this.state.paymentResponseText !== "" ?
            <PaymentSnackbar isSnackbarOpen={this.state.isSnackbarOpen} changeOpen={this.changeSnackbarOpen} responseText={this.state.paymentResponseText}/> :
            <div/>
    }

    render(): JSX.Element {
        return (
            <div>
                <Dialog open={this.props.isModalOpen} style={dialogStyles.modal} onClose={this.props.toggleModalOpen} aria-labelledby="form-dialog-title">
                    <DialogTitle id="payment-form-title">Payment form</DialogTitle>
                    <DialogContent>
                        <TextField value={this.state.name} autoFocus={true} margin="dense" id="student-name" label="Name" type="email" fullWidth={true} onChange={this.changeStudentName}/>
                        <TextField value={this.state.surname} margin="dense" id="student-surname" label="Surname" type="email" fullWidth={true} onChange={this.changeSurname}/>
                        <TextField value={this.state.studentNumber} margin="dense" id="student-number" label="Stud. Number" type="email" fullWidth={true} onChange={this.changeStudentNumber}/>
                        <TextField
                            value={this.state.dormitoryNumber}
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
                            value={this.state.roomNumber}
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
                            value={this.state.duration.toString()}
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
                            value={this.state.price}
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