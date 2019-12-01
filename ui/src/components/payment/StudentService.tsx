import axios from 'axios';
import {Student} from "./Student";
import {BackendHost} from "../../util/BackendHost";

export class StudentService {

    private studentIsExistEndpoint: string;

    constructor() { 
        this.studentIsExistEndpoint = BackendHost.url + "/student/isExist";
    }

    public async isStudentExist(student: Student): Promise<Boolean> {
        // TODO: remove this mock and replace by call to API:
        // axios.post<Boolean>(this.studentIsExistEndpoint, student).then(response => response.data);
        return false;
    }
}