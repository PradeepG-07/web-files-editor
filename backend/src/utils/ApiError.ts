class ApiError extends Error {
    public success: boolean;
    public error: Error | string | null | object;
    public statusCode: number;
    public message: string;
    constructor(
        statusCode: number,
        error: Error | string | null | object,
        message: string
    ) {
        super(message);
        if (error instanceof Error) {
            this.cause = error.cause;
            this.name = error.name;
        }
        this.success = false;
        this.error = error;
        this.statusCode = statusCode;
        this.message = message;
    }
}
export default ApiError;
