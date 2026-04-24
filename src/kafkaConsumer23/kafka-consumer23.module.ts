import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConsumerController } from './kafka-consumer23.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'nest-consumer',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'nest-consumer-group', // Essential for tracking offsets
          },
        },
      },
    ]),
  ],
  controllers: [KafkaConsumerController],
})
export class KafkaConsumerModule {}