const protocol: string = "http";
const hostName: string = "localhost";
const port: string = "8080";
const contextPath: string = "settler";

export class BackendHost {
    private url: string;

    constructor() {
        this.url = `${protocol}://${hostName}:${port}/${contextPath}`;
    }

    public getUrl(): string {
        return this.url;
    }
}