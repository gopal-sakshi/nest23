import { trace, context, SpanStatusCode } from '@opentelemetry/api';

export function TraceSpan23(spanName?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const tracer = trace.getTracer(target.constructor.name || 'default');       // get the tracer - constructor name            
            const name = spanName || `${target.constructor.name}.${propertyKey}`;       // determine span name -- method name
            
            return tracer.startActiveSpan(name, (span) => {         // start the span and run original method inside activeContext
                try {
                    const result = originalMethod.apply(this, args);
                    if (result instanceof Promise) {                    // (A) Handle Promises/Async methods
                        return result
                            .then((res) => {
                                span.setStatus({ code: SpanStatusCode.OK });
                                return res;
                            })
                            .catch((error) => {
                                span.recordException(error);
                                span.setStatus({
                                    code: SpanStatusCode.ERROR,
                                    message: error.message
                                });
                                throw error;
                            })
                            .finally(() => {
                                span.end(); // Always end the span
                            });
                    }

                    // (B) Handle synchronous methods
                    span.setStatus({ code: SpanStatusCode.OK });
                    span.end();
                    return result;
                } catch (error:any) {
                    span.recordException(error);                                // Handle synchronous errors
                    span.setStatus({
                        code: SpanStatusCode.ERROR,
                        message: error.message
                    });
                    span.end();
                    throw error;
                }
            });
        };

        return descriptor;
    };
}