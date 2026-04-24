import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';

@Controller()
export class KafkaConsumerController {
  
  @MessagePattern('containers33-topic_a1') // Matches the topic name from your Node script
  handleMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const partition = context.getPartition();
    const offset = originalMessage.offset;

    console.log(`--- New Message Received ---`);
    console.log(`Payload:`, message);
    console.log(`Partition: ${partition} | Offset: ${offset}`);
  }
}