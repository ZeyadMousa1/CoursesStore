export class AppError extends Error {

    statusCode: number;
    statusText: string;

    constructor(message: string , statusCode: number, statusTetx: string) {
        super(message)
        this.statusCode = statusCode
        this.statusText = statusTetx
    }

}

export const createCustomError = (message: string, statusCode: number, statusText: string) => {
    return new AppError(message, statusCode, statusText)
}
