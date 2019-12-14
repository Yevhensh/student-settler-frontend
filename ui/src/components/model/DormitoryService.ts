import axios from 'axios';
import {BackendHost} from "../../util/BackendHost";
import Dormitory from "./Dormitory";
import Room from "./Room";

export default class DormitoryService {

    private dormitoryFetchEndpoint: string;
    private roomFetchEndpoint: (s: number) => string;

    constructor() {
        this.dormitoryFetchEndpoint = `${BackendHost.url}/dormitories`;
        this.roomFetchEndpoint = (dormitoryId: number) => `${BackendHost.url}/dormitories/${dormitoryId}/rooms`
    }

    public async fetchDormitories(): Promise<Dormitory[]> {
        return axios.get<Dormitory[]>(this.dormitoryFetchEndpoint).then(response => response.data);
    }

    public async fetchDormitoryRooms(dormitoryId: number): Promise<Room[]> {
        return axios.get<Room[]>(this.roomFetchEndpoint(dormitoryId)).then(response => response.data);
    }
}