class ApiRespone<T> {
    public status: number;
    public data: T;
    public message: string;
    constructor(status: number, data: T, message: string) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}
export default ApiRespone;
