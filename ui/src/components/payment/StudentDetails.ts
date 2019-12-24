import { Student } from '../model/Student';
import {StringUtils} from "../../util/StringUtils";
import Dormitory from "../model/Dormitory";

export class StudentDetails {
    private _student: Student;
    private _dormitory: Dormitory;
    private _roomNumber: string;
    private _monthsCount: number;

    constructor(student: Student, dormitoryNumber: Dormitory, roomNumber: string, monthsCount: number) {
        this._student = student;
        this._dormitory = dormitoryNumber;
        this._roomNumber = roomNumber;
        this._monthsCount = monthsCount;
    }

    public static emptyData() {
        return new StudentDetails(Student.emptyData(), null, null, null);
    }

    public emptyDataIfNull() {
        this._student.emptyDataIfNull();
        if (!this.monthsCount) {
            this.monthsCount = 0;
        }
        this.roomNumber = StringUtils.emptyIfNull(this._roomNumber);
    }

    public isDataFilled(): boolean {
        return this._student.isDataFilled()
            && this._dormitory != null
            && this._roomNumber != null
            && this._monthsCount != null
    }


    get student(): Student {
        return this._student;
    }

    set student(value: Student) {
        this._student = value;
    }

    get dormitory(): Dormitory {
        return this._dormitory;
    }

    set dormitory(value: Dormitory) {
        this._dormitory = value;
    }

    get roomNumber(): string {
        return this._roomNumber;
    }

    set roomNumber(value: string) {
        this._roomNumber = value;
    }

    get monthsCount(): number {
        return this._monthsCount;
    }

    set monthsCount(value: number) {
        this._monthsCount = value;
    }
}