export type ErrorCodes =  400 | 401 | 403 | 404 | 409 | 500
export default class ErrorGeneric {
    status: ErrorCodes
    errMsg?: string
    constructor(msg: string, status: ErrorCodes) {
        this.errMsg = msg
        this.status = status
    }
}

export function isError(arg: any): arg is ErrorGeneric {
    return arg && arg.status && typeof(arg.status) == 'number'
}