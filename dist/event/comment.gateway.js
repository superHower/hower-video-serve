"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let CommentGateway = class CommentGateway {
    constructor() {
        this.clients = new Map();
    }
    handleConnection(client) {
        const videoId = Number(client.handshake.query.videoId);
        if (!videoId)
            return client.disconnect(true);
        if (!this.clients.has(videoId)) {
            this.clients.set(videoId, new Set());
        }
        const connections = this.clients.get(videoId);
        connections.add(client);
        console.log(`Websocket连接------------ 视频ID ${videoId}`);
        return;
    }
    handleDisconnect(client) {
        const videoId = Number(client.handshake.query.videoId);
        if (this.clients.has(videoId)) {
            const connections = this.clients.get(videoId);
            connections.delete(client);
            if (connections.size === 0) {
                this.clients.delete(videoId);
            }
        }
        console.log(`Websocket断开连接------------ 视频ID ${videoId}`);
    }
    broadcastNewComment(comment) {
        console.log(`广播新评论------------ 视频ID ${comment.videoId}`);
        if (this.clients.has(comment.videoId)) {
            const connections = this.clients.get(comment.videoId);
            connections.forEach(client => {
                client.emit('new-comment', comment);
            });
        }
    }
};
exports.CommentGateway = CommentGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], CommentGateway.prototype, "server", void 0);
exports.CommentGateway = CommentGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        },
        transports: ['websocket'],
        allowEIO3: true
    })
], CommentGateway);
//# sourceMappingURL=comment.gateway.js.map