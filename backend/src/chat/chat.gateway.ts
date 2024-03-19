import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import MessageDto from './dto/message.dto';
import { ChatService } from './chat.service';
import { UserService } from '../user/user.service';

@WebSocketGateway({ cors: { origin: process.env.FRONTEND_URL } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;
  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
  ) {
    this.logger.log('Initializing...');
  }

  @SubscribeMessage('chat')
  async handleMessage(@MessageBody() payload: MessageDto): Promise<MessageDto> {
    try {
      await this.chatService.saveMessage(
        payload.chat._id,
        payload.sender._id,
        payload.content,
      );

      this.server.emit('chat', payload);
      return payload;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @SubscribeMessage('setUser')
  async handleSetUser(@MessageBody() clientId: string): Promise<MessageDto[]> {
    try {
      const user = await this.userService.findById(clientId);

      if (!user) {
        this.logger.log(`User not found`);
        return [];
      }

      const admin = await this.userService.getAdmin();
      const chat = await this.chatService.findOrCreate([clientId, admin._id]);
      let messages = await this.chatService.getMessages(chat._id);

      if (user.type === 'CLIENT' && messages.length === 0) {
        await this.chatService.saveMessage(
          chat._id,
          admin._id,
          'Seja bem vindo, como posso te ajudar?',
        );
        messages = await this.chatService.getMessages(chat._id);
      }

      this.server.emit('setUser', chat._id);
      this.server.emit('loadMessages', messages);
      return messages;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  handleConnection(socket: Socket) {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }
}
