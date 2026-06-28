import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// cors: true allows your frontend to connect
@WebSocketGateway({ cors: true })
export class WebsocketGateway23 implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    sendKafkaUpdate(payload: any) {             // Method to easily broadcast data from your controller
        this.server.emit('kafka-stream23', payload);        // postman lo b23_gRPC23__ folder lo nest23 folder lo "websocket24_useThis"
                                                                // ee request -- kafka-stream23 ki subscribe chesukundi postman client
    }
}