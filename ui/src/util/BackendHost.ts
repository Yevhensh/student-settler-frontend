const protocol: string = "http";
const hostName: string = "localhost";
const port: string = "8080";
const contextPath: string = "settler";

export class BackendHost {
    public static readonly url: string = `${protocol}://${hostName}:${port}/${contextPath}`;
}