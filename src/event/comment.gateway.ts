// comment.gateway.ts
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // 生产环境应限制为前端域名
    methods: ['GET', 'POST']
  },
  transports: ['websocket'],  // 强制使用websocket传输
  allowEIO3: true             // 允许v3协议兼容
})
export class CommentGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server?: Server;
  
  // 按视频ID存储连接
  private clients = new Map<number, Set<Socket>>(); // 多个客户端的ws连接

  handleConnection(client: Socket) {
    const videoId = Number(client.handshake.query.videoId);
    if (!videoId) return client.disconnect(true);
    
    if (!this.clients.has(videoId)) {
      this.clients.set(videoId, new Set());
    }
    const connections = this.clients.get(videoId)!; // 使用非空断言
    connections.add(client);  
    console.log(`Websocket连接------------ 视频ID ${videoId}`);
    return
  }

  handleDisconnect(client: Socket) {
    const videoId = Number(client.handshake.query.videoId);
    if (this.clients.has(videoId)) {
      const connections = this.clients.get(videoId)!;
      connections.delete(client);
      if (connections.size === 0) {
        this.clients.delete(videoId);
      }
    }
    console.log(`Websocket断开连接------------ 视频ID ${videoId}`);

  }

  // 广播新评论的方法
  broadcastNewComment( comment: any) {
    console.log(`广播新评论------------ 视频ID ${comment.videoId}`);
    if (this.clients.has(comment.videoId)) {
      const connections = this.clients.get(comment.videoId)!;
      connections.forEach(client => {
        client.emit('new-comment', comment);
      });
    }
  }
}