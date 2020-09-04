import { serviceContainer } from '../config/inversify.config';
import { LoggerInterface, Logger } from "../types/logger.types";

export const serviceLogger = ( target: any, key: string, descriptor: any ) => {
    const originalFn = descriptor.value;

    descriptor.value = function ( ...args: any[] ) {
        serviceContainer.get<LoggerInterface>(Logger)
            .logServiceRequest(
                `Called method of ${ target.constructor.name } - ${ key } with arguments: ${ JSON.stringify( args ) }`
            );

        return originalFn.apply( this, args );
    }
}