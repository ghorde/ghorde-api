import { errLogger } from '../main';
export default class ErrorHandler {
    handlerName: string
    constructor(handlerName: string) {
        this.handlerName = handlerName
    }
    notFound(err: string) {
        errLogger.error(`❌ Err encountered at: ${this.handlerName}\nError Details: ${err}`)
    }
}