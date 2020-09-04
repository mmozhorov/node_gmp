export interface LoggerInterface {
    logServiceRequest: ( method: string ) => void
}

export const Logger = Symbol.for('Logger');