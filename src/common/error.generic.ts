import { IResponseGeneric } from './response.generic';
export type ErrorCodes =  400 | 401 | 403 | 404 | 409 | 500
export default class ErrorGeneric implements IResponseGeneric {
    readonly success: boolean
    status: ErrorCodes
    errMsg?: string
    constructor(msg: string, status: ErrorCodes) {
        this.errMsg = msg
        this.status = status
        this.success = false
    }
}

export function isError(arg: any): arg is ErrorGeneric {
    return arg && arg.success && typeof(arg.success) == 'boolean' && !arg.success
}