import pino, { Logger } from 'pino'

export const configureLogger: (logger: typeof pino) => Logger = (logger) => {
    const configgedLogger = logger({
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        }
    })
    return configgedLogger
}