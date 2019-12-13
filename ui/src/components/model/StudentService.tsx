import axios from 'axios';
import { Student } from "./Student";
import { BackendHost } from "../../util/BackendHost";
import { ValidateDTO } from './ValidateDTO';
import {StudentPayload} from "../payload/StudentPayload";

export class StudentService {

    private studentIsExistEndpoint: string;


    constructor() {
        this.studentIsExistEndpoint = BackendHost.url + "/student/validate";
    }

    public async isStudentPresent(student: Student): Promise<ValidateDTO> {
        const {name, surname, studentNumber} = student;
        const studentPayload: StudentPayload = {
            name: name,
            surname: surname,
            studentNumber: studentNumber
        };
        return axios.post<ValidateDTO>(this.studentIsExistEndpoint, studentPayload).then(response => response.data);
    }
}