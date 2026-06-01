run the 4 containers -- nest23__
- otel_collector
- prometheus_backend
- grafana_ui
- tempo


start nestjs app

go to localhost:3000 --- grafana dashboard


add temp23 & prometheus datasources
    Connections --> Data sources.
    Click Add data source
    select Prometheus.
    Connection URL = http://prometheus:9090
    Scroll to the bottom and click Save & test.

Add data source, and select Tempo.
In the Connection URL input box, type: http://tempo:3200
Scroll to the bottom and click Save & test.

Explore section

# in dropdown === choose tempo23
- serviceName & spanName -- custom-name-babai23
- hit movies endpoint - createMovie
- you can see the traceId; click on it... you'll see



nestjs23__tracing23 POST /movies23 (6.76ms)

middleware - patched (128.83μs)             128.83μs
middleware - <anonymous> (28.48μs)          28.48μs
middleware - patched (496.52μs)             496.52μs
middleware - jsonParser (416.15μs)          416.15μs
middleware - patched (5.53ms)               5.53ms

request handler - /movies23 (5.37ms)        5.37ms
request handler - /movies23 (5.28ms)        5.28ms
Movies23Controller (4.74ms)                 4.74ms
anonymous nest handler (2.61ms)             2.61ms
custom-name-babai23 (2.57ms)                2.57ms
mongoose.Movies24.save (2.31ms)             2.31ms
mongodb.insert (1.21ms)                     1.21ms

POST (2.3ms)                                2.3ms
dns.lookup (1.41ms)                         1.41ms
tcp.connect (1.93ms)                        1.93ms
middleware - patched (115.64μs)             115.64μs
middleware - urlencodedParser (38.33μs)     38.33μs | nestjs23__tracing23::middleware - urlencodedParser

`summary`
- Entry Point               : client hits POST /movies23 and the total round trip takes 6.76ms.
- Express Middlewares       : request passes through standard framework processing, like parsing the JSON body (jsonParser takes 416.15μs).
- NestJS Router             : request hits your Movies23Controller, which consumes 4.74ms of that total time.
- Custom Decorator Layer    : Inside that controller, your @TraceSpan23 decorator boots up. The business logic wrapped inside custom-name-babai23 takes 2.57ms.
- Database Layer            : Inside your service logic, Mongoose triggers a save event (mongoose.Movies24.save takes 2.31ms)
                                which internally fires a raw MongoDB driver network command (mongodb.insert taking 1.21ms).
- Network I/O               : You can even see the underlying infrastructure spinning up—doing a dns.lookup (1.41ms) 
                                and establishing a tcp.connect (1.93ms) to talk to your database.

you can see the time taken for each step
if in production -- you see high latency, you can inspect where the delay is happening

<!-- ********************************************************************************** -->

# in the dropdown section, choose prometheus

you'll see all other metrics
