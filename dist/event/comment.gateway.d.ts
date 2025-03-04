import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class CommentGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server?: Server;
    private clients;
    handleConnection(client: Socket): Socket<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any> | undefined;
    handleDisconnect(client: Socket): void;
    broadcastNewComment(comment: any): void;
}
