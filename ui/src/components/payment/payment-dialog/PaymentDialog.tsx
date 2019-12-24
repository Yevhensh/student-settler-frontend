import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {dialogStyles} from "../../../styles/Styles";
import {PayService} from "../../model/PayService";
import {StudentService} from "../../model/StudentService";
import {PaymentDetails} from "../PaymentDetails";
import PaymentSnackbar from "../snackbar/PaymentSnackbar";
import {StringUtils} from '../../../util/StringUtils';
import {ValidateDTO} from '../../model/ValidateDTO';
import {PaymentState} from "./PaymentState";
import {PaymentProps} from "./PaymentProps";
import DormitoryService from "../../model/DormitoryService";
import ObjectUtils from "../../../util/ObjectUtils";
import Dormitory from "../../model/Dormitory";
import Room from "../../model/Room";

export default class PaymentDialog extends Component<PaymentProps, PaymentState> {
    private readonly FIELD_IS_REQUIRED_MESSAGE: string = 'This field is required';

    private payService: PayService;
    private dormitoryService: DormitoryService;
    private studentService: StudentService;

    constructor(props: PaymentProps) {
        super(props);
        this.payService = new PayService();
        this.dormitoryService = new DormitoryService();
        this.studentService = new StudentService();
    }

    public state: PaymentState = PaymentDialog.formEmptyData();

    public async componentDidMount() {
        this.reinitializeData();
        const dormitories = await this.dormitoryService.fetchDormitories();
        this.setState({
            dormitories: dormitories
        });
    }

    private static formEmptyData(): PaymentState {
        return {
            paymentDetails: PaymentDetails.emptyData(),
            paymentResponseText: '',
            isSnackbarOpen: false,
            isStudentPresent: true,
            errorMessageIfStudentNotPresent: '',
            dormitories: [],
            rooms: [],
            isFormFilled: true
        }
    };

    private reinitializeData = () => {
        this.setState(PaymentDialog.formEmptyData())
    };

    private payForDormitory = async () => {
        this.isFormValid().then((valid) => valid && this.doPayAndDisplayResponse());
    };

    private doPayAndDisplayResponse = async () => {
        const paymentResponse = await this.payService.payForDormitory(this.state.paymentDetails);
        this.setState({
            paymentResponseText: paymentResponse.message,
            isSnackbarOpen: true
        });
        setTimeout(() => this.closeModal(), 1500);
    };

    private closeModal = () => {
        this.props.toggleModalOpen(false);
    };

    private isFormValid = async () => {
        if (!this.updateFormFilledState()) {
            this.resetStudentPresentState();
            return false;
        }
        const validationResult = await this.isStudentPresent();
        return this.updateStudentPresentState(validationResult);
    };

    private updateFormFilledState = () => {
        const isFormFilled = this.state.paymentDetails.isDataFilled();
        this.setState({
            isFormFilled: isFormFilled
        });
        return isFormFilled;
    };

    private resetStudentPresentState = () => {
        this.setState({
            isStudentPresent: true,
            errorMessageIfStudentNotPresent: ''
        })
    };

    private isStudentPresent = async () => {
        const student = this.state.paymentDetails.student;
        return await this.studentService.isStudentPresent(student);
    };

    private updateStudentPresentState = (validationResult: ValidateDTO): boolean => {
        this.setState({
            isStudentPresent: validationResult.success,
            errorMessageIfStudentNotPresent: validationResult.failMessage
        });

        return validationResult.success;
    };

    private formErrorMessage = (value: string) => {
        const formNotFilledMessage = this.getErrorMessageIfTextFieldBlank(value);
        if (formNotFilledMessage) {
            return formNotFilledMessage;
        }
        return this.state.isStudentPresent ? '' : this.state.errorMessageIfStudentNotPresent;
    };

    private getErrorMessageIfTextFieldBlank = (value: string) => {
        return !this.isTextFieldBlank(value) ? '' : this.FIELD_IS_REQUIRED_MESSAGE;
    };

    private isTextFieldBlank = (value: string) => {
        return !this.state.isFormFilled && StringUtils.isBlank(value);
    };

    private changeSnackbarOpen = (isOpen: boolean) => {
        this.setState({
            isSnackbarOpen: isOpen
        });
    };

    private fetchMonthsCountItems = () => {
        let months = [];
        for (let i = 1; i < 10; i++) {
            months.push(i.toString())
        }
        return months;
    };

    private populateRooms = async () => {
        const dormitory = this.state.paymentDetails.dormitory;
        if (!ObjectUtils.checkNotNull(dormitory)) {
            return [];
        }
        const rooms = await this.dormitoryService.fetchDormitoryRooms(dormitory.id);
        this.setState({
            rooms: rooms
        });
    };

    private changeTextValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        this.setState((state) => {
            state.paymentDetails.student[name] = value;
            return state;
        });
    };

    private changeDormitorySelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        this.setState((state) => {
            state.paymentDetails.dormitory = this.state.dormitories.find(dormitory => dormitory.number.toString() == event.target.textContent);
            if (!ObjectUtils.checkNotNull(state.paymentDetails.dormitory)) {
                state = {...state, rooms: []};
                state.paymentDetails.roomNumber = "";
            }
            return state;
        }, () => {
            this.populateRooms();
        });
    };

    private changeRoomSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        this.setState((state) => {
            state.paymentDetails.roomNumber = event.target.textContent;
            return state;
        });
    };

    private changeMonthsCount = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        this.setState((state) => {
            state.paymentDetails.monthsCount = this.parseNumberFromAutoselect(event);
            return state;
        });
    };

    private parseNumberFromAutoselect = (event: React.ChangeEvent<HTMLInputElement>) => {
        return StringUtils.isNotEmpty(event.target.textContent) ? Number.parseInt(event.target.textContent) : null;
    };

    private paymentRepsonse = () => {
        return this.state.paymentResponseText !== "" ? this.displayPaymentSnackbar() : <div/>;
    };

    private displayPaymentSnackbar = () => {
        return (
            <PaymentSnackbar
                isSnackbarOpen={this.state.isSnackbarOpen}
                changeOpen={this.changeSnackbarOpen}
                responseText={this.state.paymentResponseText}
            />
        );
    };

    private formAutoselectContent = (params, label: string, value: string) => {
        return (
            <TextField
                {...params}
                label={label}
                margin="normal"
                fullWidth={true}
                required={true}
                error={this.isTextFieldBlank(value)}
                helperText={this.getErrorMessageIfTextFieldBlank(value)}
            />
        );
    };

    private formTextField = (name: string, tfValue: string, tfIdentifier: string, tfLabel: string, formHelperText: (s: string) => string,
                             onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void) => {
        return (
            <TextField
                value={tfValue}
                margin="dense"
                id={tfIdentifier}
                name={name}
                label={tfLabel}
                type="text"
                fullWidth={true}
                required={true}
                error={!this.state.isStudentPresent || this.isTextFieldBlank(tfValue)}
                helperText={formHelperText(tfValue)}
                onChange={onChangeHandler}
            />
        );
    };

    private formAutocomplete = (autocompleteId, autocompleteValue: string, autoselectLabel: string, options: any[],
                                getOptionLabel: (a: any) => string,
                                changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void) => {
        return (
            <Autocomplete
                id={autocompleteId}
                options={options}
                inputValue={autocompleteValue}
                getOptionLabel={getOptionLabel}
                onChange={changeHandler}
                renderInput={params => this.formAutoselectContent(params, autoselectLabel, autocompleteValue)}
            />
        );
    };

    private calculatePrice = () => {
        const dormitory = this.state.paymentDetails.dormitory;
        if (!ObjectUtils.checkNotNull(dormitory)) {
            return "";
        }
        const pricePerMonth = dormitory.pricePerMonth.price;
        const monthsCount = this.state.paymentDetails.monthsCount;
        return (monthsCount ? monthsCount : 1) * pricePerMonth;
    };

    render(): JSX.Element {
        const paymentDetails: PaymentDetails = this.state.paymentDetails;
        paymentDetails.emptyDataIfNull();
        const {student, dormitory, roomNumber, monthsCount} = paymentDetails;
        const {name, surname, studentNumber} = student;
        const textFields = this.formTextFields(name, surname, studentNumber, dormitory, roomNumber, monthsCount);
        return (
            <div>
                <Dialog
                    open={this.props.isModalOpen}
                    style={dialogStyles.modal}
                    onClose={this.closeModal}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="payment-form-title">Payment form</DialogTitle>
                    <DialogContent>
                        {textFields}
                        <TextField
                            value={this.calculatePrice()}
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
                        <Button onClick={this.closeModal} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                {this.paymentRepsonse()}
            </div>
        );
    }

    private formTextFields(name, surname, studentNumber, dormitoryNumber, roomNumber, monthsCount) {
        const studentNameField = this.formTextField("name", name, "student-name", "Name", this.getErrorMessageIfTextFieldBlank, this.changeTextValue);
        const studentSurnameField = this.formTextField("surname", surname, "student-surname", "Surname", this.getErrorMessageIfTextFieldBlank, this.changeTextValue);
        const studentNumberField = this.formTextField("studentNumber", studentNumber, "student-number", "Stud. Number", this.formErrorMessage, this.changeTextValue);
        const dormitorySelectField = this.formAutocomplete("dormitory-select", StringUtils.ofNumberOrNull(dormitoryNumber),
            "Dormitory number", this.state.dormitories, (dormitory: Dormitory) => dormitory.number.toString(), this.changeDormitorySelect);
        const roomSelectField = this.formAutocomplete("room-select", roomNumber, "Room number", this.state.rooms,
            (room: Room) => room.title.toString(), this.changeRoomSelect);
        const monthCountSelectField = this.formAutocomplete("monthsCount-select", StringUtils.ofNumberOrNull(monthsCount), "Amount of months",
            this.fetchMonthsCountItems(), (month: string) => month, this.changeMonthsCount
        );
        return [studentNameField, studentSurnameField, studentNumberField, dormitorySelectField, roomSelectField, monthCountSelectField];
    }
}