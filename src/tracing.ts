import { Observability } from "./utils23/others24/observability23";

const SERVICE_NAME = process.env.OTEL_SERVICE_NAME || 'nestjs23__tracing23';
const OTLP_ENDPOINT = process.env.OTLP_ENDPOINT || 'http://localhost:4318';

if(process.env.ENABLE_TRACING === 'true') {
    Observability.init(SERVICE_NAME, OTLP_ENDPOINT);
} else {
    console.log("tracing disabled23");
}
