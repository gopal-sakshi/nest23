import { trace, metrics, Meter } from '@opentelemetry/api';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';

export class Observability {
    private static sdk: NodeSDK | null = null;

    // Initializes the OpenTelemetry SDK with Tracing and Metrics
    public static init(serviceName: string, otlpEndpoint: string): void {
        if (this.sdk) {
            console.warn('Observability SDK has already been initialized.');
            return;
        }

        const traceExporter = new OTLPTraceExporter({              // 1. Configure Trace Exporter (HTTP/protobuf)     
            url: `${otlpEndpoint}/v1/traces`,
        });
        // const traceExporter = new ConsoleSpanExporter();         // 1a. check traces/metrics locally
        const metricExporter = new OTLPMetricExporter({             // 2. Configure Metric Exporter and Reader
            url: `${otlpEndpoint}/v1/metrics`,
        });

        const metricReader = new PeriodicExportingMetricReader({
            exporter: metricExporter,
            exportIntervalMillis: 60000, // Export metrics every 60 seconds
        });

        this.sdk = new NodeSDK({                                    // 3. Initialize NodeSDK
            serviceName,
            traceExporter,
            metricReader,
            instrumentations: [getNodeAutoInstrumentations()],
        });

        this.sdk.start();                                               // 4. Start the SDK
        console.log(`[Observability] SDK initialized for service: ${serviceName}`);

        // Handle graceful shutdown
        process.on('SIGTERM', () => this.shutdown());
        process.on('SIGINT', () => this.shutdown());
    }

    // Gets a meter for custom metrics instrumentation
    public static getMeter(name: string, version?: string): Meter {
        return metrics.getMeter(name, version);
    }

    // Retrieves the Trace ID of the currently active span context; Returns undefined if no active span exists.
    public static getActiveTraceId(): string | undefined {
        const activeSpan = trace.getActiveSpan();
        if (!activeSpan) return undefined;

        const spanContext = activeSpan.spanContext();
        return spanContext.traceId;
    }

    // Cleanly shuts down the SDK
    private static async shutdown(): Promise<void> {
        if (this.sdk) {
            try {
                await this.sdk.shutdown();
                console.log('[Observability] SDK shut down successfully.');
            } catch (error) {
                console.error('[Observability] Error during SDK shutdown:', error);
            } finally {
                this.sdk = null;
                process.exit(0);
            }
        }
    }
}