import { errLogger } from '../main';
import  ErrorGeneric from './error.generic';
export default class ErrorHandler {
    readonly handlerName: string
    constructor(handlerName: string) {
        this.handlerName = handlerName
    }

    private useTemplate(err: string) {
        return `Err encountered at: ${this.handlerName}. ${err ?`Error Details: ${err}` : ''}`
    }

    badRequest(err?: string) {
        const error = new ErrorGeneric(`❌ Bad Request: ${this.useTemplate(err)}`, 400)
        errLogger.error(error.errMsg)
        return (error)
    }

    unauthorized(err?: string) {
        const error = new ErrorGeneric(`❌ Unauthorized: ${this.useTemplate(err)}`, 401)
        errLogger.error(error.errMsg)
        return (error)
    }

    forbidden(err?: string) {
        const error = new ErrorGeneric(`❌ Forbidden: ${this.useTemplate(err)}`, 403)
        errLogger.error(error.errMsg)
        return (error)
    }

    notFound(err?: string) {
        const error = new ErrorGeneric(`❌ Not Found: ${this.useTemplate(err)}`, 404)
        errLogger.error(error.errMsg)
        return (error)
    }

    conflict(err?: string) {
        const error = new ErrorGeneric(`❌ Conflict: ${this.useTemplate(err)}`, 409)
        errLogger.error(error.errMsg)
        return (error)
    }

    internal(err?: string) {
        const error = new ErrorGeneric(`❌ Server Internal Error: ${this.useTemplate(err)}`, 500)
        errLogger.error(error.errMsg)
        return (error)
    }
}