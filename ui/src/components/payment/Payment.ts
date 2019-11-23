
export class Payment {
    private name: string;
    private surName: string;
    private studentNumber: string;
    private dormitoryNumber: number;
    private room: string;

    constructor(name: string, surName: string, studentNumber: string, dormitoryNumber: number, room: string) {
        this.name = name;
        this.surName = surName;
        this.studentNumber = studentNumber;
        this.dormitoryNumber = dormitoryNumber;
        this.room = room;
    }

    public getName(): string {
        return this.name;
    }

    public setName(value: string) {
        this.name = value;
    }

    public getSurName(): string {
        return this.surName;
    }

    public setSurName(value: string) {
        this.surName = value;
    }

    public getStudentNumber(): string {
        return this.studentNumber;
    }

    public setStudentNumber(value: string) {
        this.studentNumber = value;
    }

    public getDormitoryNumber(): number {
        return this.dormitoryNumber;
    }

    public setDormitoryNumber(value: number) {
        this.dormitoryNumber = value;
    }

    public getRoom(): string {
        return this.room;
    }

    public setRoom(value: string) {
        this.room = value;
    }
}