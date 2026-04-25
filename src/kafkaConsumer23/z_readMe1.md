this module receives messages from kafka topic <containers33-topic_a1>
it does 2 things (in RLCS)
- put the kafka messages in timescaleDB
- publish the messages to redisQueue (managed by bullmq); which are pickedup by processor & put in S3 bucket
ProcessQueueData23 -- processes the messages & puts in S3 bucket

`Why`
- this is classic Offloading pattern. 
- Kafka is the high-speed entry point.
- TimescaleDB is the immediate "hot" storage.
- BullMQ (Redis) acts as a buffer for the S3 upload, which is a "slow" I/O operation. 
- By putting it in a queue, the Kafka consumer can finish its job instantly without waiting for the slow S3 upload to finish.
- so, in essence -- <kafkaConsumer23> acts as 
    Kafka Consumer
    BullMQ Producer
    BullMQ Consumer (see ProcessQueueData23)
