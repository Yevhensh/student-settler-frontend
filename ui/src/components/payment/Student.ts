import {StringUtils} from '../../util/StringUtils';

export class Student {

    private name: String
    private surName: String
    private studentNumber: String

    constructor(name: String, surName:String, studentNumber: String) {
        this.name = name;
        this.surName = surName;
        this.studentNumber = studentNumber;
    }

    public static emptyData(): Student {
        return new Student(null, null, null);
    }

    public setName(value: String) {
        this.name = value;
    }

    public getName(): String {
        return this.name;
    }

    public setSurName(value: String) {
        this.surName = value;
    }

    public getSurName(): String {
        return this.surName;
    }

    public setStudentNumber(value: String) {
        this.studentNumber = value;
    }

    public getStudentNumber(): String {
        return this.studentNumber;
    }

    public isDataFilled(): boolean {
        return StringUtils.isNotEmpty(this.name)
            && StringUtils.isNotEmpty(this.surName)
            && StringUtils.isNotEmpty(this.studentNumber);
    }
}