import { StringUtils } from '../../util/StringUtils';

export class Student {

    private name: string;
    private surname: string;
    private studentNumber: string;

    constructor(name: string, surname: string, studentNumber: string) {
        this.name = name;
        this.surname = surname;
        this.studentNumber = studentNumber;
    }

    public static emptyData(): Student {
        return new Student(null, null, null);
    }

    public getName(): string {
        return this.name;
    }

    public setName(value: string) {
        this.name = value;
    }

    public getSurname(): string {
        return this.surname;
    }

    public setSurname(value: string) {
        this.surname = value;
    }

    public getStudentNumber(): string {
        return this.studentNumber;
    }

    public setStudentNumber(value: string) {
        this.studentNumber = value;
    }

    public isDataFilled(): boolean {
        return StringUtils.isNotEmpty(this.name)
            && StringUtils.isNotEmpty(this.surname)
            && StringUtils.isNotEmpty(this.studentNumber);
    }
}