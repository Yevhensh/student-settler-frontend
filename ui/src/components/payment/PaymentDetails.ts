import { Student } from './Student';

export class PaymentDetails {
    private student: Student;
    private dormitoryNumber: number;
    private roomNumber: string;
    private monthsCount: number;

    constructor(student: Student, dormitoryNumber: number, room: string, monthsCount: number) {
        this.student = student;
        this.dormitoryNumber = dormitoryNumber;
        this.roomNumber = room;
        this.monthsCount = monthsCount;
    }

    public static emptyData() {
        return new PaymentDetails(Student.emptyData(), null, null, null);
    }

    public isDataFilled(): Boolean {
        return this.student.isDataFilled()
            && this.dormitoryNumber != null
            && this.roomNumber != null
            && this.monthsCount != null
    }

    public getStudent(): Student {
        return this.student;
    }

    public setStudent(value: Student) {
        this.student = value;
    }

    public getDormitoryNumber(): number {
        return this.dormitoryNumber;
    }

    public setDormitoryNumber(value: number) {
        this.dormitoryNumber = value;
    }

    public getRoomNumber(): string {
        return this.roomNumber;
    }

    public setRoomNumber(value: string) {
        this.roomNumber = value;
    }

    public getMonthsCount(): number {
        return this.monthsCount;
    }

    public setMonthsCount(value: number) {
        this.monthsCount = value;
    }
}