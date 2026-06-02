import { Logger } from '@nestjs/common';

export interface RetryOptions {
    maxAttempts: number;
    backoffMs?: number;
}

export function Retry23(options: RetryOptions) {
    const logger = new Logger('RetryDecorator');
    const maxAttempts = options.maxAttempts;
    const backoffMs = options.backoffMs || 1000;        // default to 1 second

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor, ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            let attempts = 0;

            while (attempts < maxAttempts) {
                try {
                    return await originalMethod.apply(this, args);      // Execute the original method
                } catch (error:any) {
                    attempts++;
                    logger.warn(`${propertyKey} failed @ ${attempts}/${maxAttempts} attempts ==> ${error.message}`,);

                    if (attempts >= maxAttempts) {
                        logger.error(`${propertyKey} failed after ${maxAttempts} attempts. Rethrowing error.`);
                        throw error;
                    }

                    // Wait before retrying (Linear backoff based on attempt number)
                    const delay = backoffMs * attempts;
                    logger.log(`Waiting ${delay}ms before next retry...`);
                    await new Promise((resolve) => setTimeout(resolve, delay));
                }
            }
        };
        return descriptor;
    };
}