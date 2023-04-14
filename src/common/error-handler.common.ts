import { errLogger } from '../main';
import { IErrorGeneric } from './error.generic.types';
export default class ErrorHandler {
    readonly handlerName: string
    constructor(handlerName: string) {
        this.handlerName = handlerName
    }

    private useTemplate(err: string) {
        return `Err encountered at: ${this.handlerName}\n${err ?`Error Details: ${err}` : ''}`
    }

    notFound(err?: string) {
        const error: IErrorGeneric = {
            error: true,
            errMsg: `❌ Not Found ${this.useTemplate(err)}`
        }
        errLogger.error(error.errMsg)
        return (error)
    }
    critical(err?: string) {
        const error: IErrorGeneric = {
            error: true,
            errMsg: `❌ Critical ${this.useTemplate(err)}`
        }
        errLogger.error(error.errMsg)
        return (error)
    }
    unhandled(err?: string) {
        const error: IErrorGeneric = {
            error: true,
            errMsg: `❌ Unhandled ${this.useTemplate(err)}`
        }
        errLogger.error(error.errMsg)
        return (error)
    }
}