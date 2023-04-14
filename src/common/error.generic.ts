export default class ErrorGeneric {
    error: boolean
    errMsg?: string
    constructor(error: boolean, msg: string) {
        this.error = error
        this.errMsg = msg
    }
}