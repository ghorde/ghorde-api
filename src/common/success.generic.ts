import { IResponseGeneric } from './response.generic';
export type SuccessCodes =  200 | 201 | 202 | 204  // 203 | 205 | 206 | 207 | 208 | 226
export default class SuccessGeneric implements IResponseGeneric {
    readonly success: boolean
    status: SuccessCodes
    msg?: string
    data: any
    constructor(msg: string, status: SuccessCodes, data: any) {
        this.msg = msg
        this.data = data
        this.status = status
        this.success = true
    }
}

export function isSuccess(arg: any): arg is SuccessGeneric {
    return arg && arg.success && typeof(arg.success) == 'boolean' && !arg.success
}