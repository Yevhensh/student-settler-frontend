
export class BackendHost {
    private protocol: string = "http";
    private hostName: string = "localhost";
    private port: string = "8080";
    private contextPath: string = "settler";
    private url: string;

    constructor() {
        this.url = `${this.protocol}://${this.hostName}:${this.port}/${this.contextPath}`;
    }

    public getUrl(): string {
        return this.url;
    }
}