run these containers first
- containers23-mongo23-1            (mongoose module injected @ root level -- app.module.ts)
- containers23-redisstack23-1
- containers33-kafka23-1



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


kafkaConsumer23
- listens on kafka queue - containers33-topic_a1
- put data in timescaleDB; put data in redis queue - <bullmq-handle-chestunna-redisQueue>; 
- ProcessQueueData23.ts -- listens to above redisqueue (bullmq job) and logs the data


movie_mongoose
- uses mongoose to insert data into mongo

student23
- it also inserts data into mongo; uses mongoose
- it has custom interceptor, custom decorator
- it has middleware - valid for certain routes

<!-- **************************************************************** -->