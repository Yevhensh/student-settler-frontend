import axios from 'axios';
import { Student } from "./Student";
import { BackendHost } from "../../util/BackendHost";
import { ValidateDTO } from './ValidateDTO';

export class StudentService {

    private studentIsExistEndpoint: string;

    constructor() {
        this.studentIsExistEndpoint = BackendHost.url + "/student/validate";
    }

    public async isStudentPresent(student: Student): Promise<ValidateDTO> {
        return axios.post<ValidateDTO>(this.studentIsExistEndpoint, student)
            .then(response => response.data);
    }
}