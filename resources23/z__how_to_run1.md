run these containers first
- containers23-mongo23-1            (mongoose module injected @ root level -- app.module.ts)
- containers23-redisstack23-1
- containers33-kafka23-1
- graphQL24_js      lo 3014 port 2__3024 --- this needs running


<!-- ******************************************************************* -->
instead of sending messages from kafbat, send it like this
open containers33-kafka23-1 shell
/opt/kafka/bin/kafka-console-producer.sh --bootstrap-server localhost:29092 --topic containers33-topic_a1
{ "id": 25, "status": "active", "message": "kafka meedu dandam pedutundi ayya" }

<!-- ******************************************************************* -->

`cats23`
- returns hardcoded data

`footballer23`
- inserts data in mongo database - 


`graphql23 & co`
- exposes an endpoint /graphql
- graphql23_telugu  = we use @Query, @Mutation decorators & fetch data from mongo database
- graphql23_gRPC    = we fetch data from backend gRPC service (see gRPC23 which has @GrpcMethod decorator)


`kafkaConsumer23`
- listens on kafka queue - containers33-topic_a1
- put data in timescaleDB; put data in redis queue - <bullmq-handle-chestunna-redisQueue>; 
- ProcessQueueData23.ts -- listens to above redisqueue (bullmq job) and logs the data


`movie_mongoose`
- uses mongoose to insert data into mongo
- aws dynamo call -- priya aws account -- crossaccount; sts assumeRole
- graphql call to 3014 port;

`student23`
- it also inserts data into mongo; uses mongoose
- it has custom interceptor, custom decorator
- it has middleware - valid for certain routes

<!-- **************************************************************** -->

ways that microservices talk to each other

`gRPC`
- Direct Network Call
- Instant, ultra-fast internal data fetching
- Synchronous (Blocking)

`Kafka (Event-Driven)`
- Log Appending
- Broadcasting events to multiple systems;
- data pipelines.
- Asynchronous (Fire-and-Forget)

`Kafka (Req/Reply)`
- Dual-Topic Wait
- Heavy async tasks where the sender must get a response back.
- Asynchronous (Blocking)

`Redis (BullMQ)`
- In-Memory Queue
- Job orchestration, retries, rate-limiting, and delayed tasks.
- Asynchronous (Worker-Driven)

`HTTP / Axios`
- Synchronous
- External APIs, Frontend-to-Backend, Simple MVPs.
- Universal, easy to debug, massive ecosystem
- High overhead, slower for internal mesh traffic.

<!-- ************************************************************************** -->