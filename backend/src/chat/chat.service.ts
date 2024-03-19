import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './schema/chat.schema';
import { Model } from 'mongoose';
import { Message } from './schema/message.schema';
import { UserService } from '../user/user.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private userService: UserService,
  ) {
    this.logger.log('Initializing...');
  }

  async findOrCreate(users: string[]): Promise<Chat> {
    try {
      const chat = await this.chatModel
        .findOne({
          users: { $all: users },
        })
        .exec();

      if (chat) {
        return chat;
      }

      const newChat = new this.chatModel({
        users,
        createdAt: new Date(),
      });

      return newChat.save();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async saveMessage(
    chatId: string,
    senderId: String,
    content: string,
  ): Promise<Message> {
    try {
      const chat = await this.chatModel.findById(chatId).exec();
      if (!chat) {
        throw new Error('Chat not found');
      }

      const user = await this.userService.findById(senderId.toString());

      if (!user) {
        throw new Error('User not found');
      }

      if (!chat.users.includes(user._id)) {
        throw new Error('User not in chat');
      }

      const message = new this.messageModel({
        sender: user,
        content,
        chat,
        createdAt: new Date(),
      });

      await message.save();
      return message;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getMessages(chatId: string): Promise<Message[]> {
    try {
      const messages = await this.messageModel
        .find({ chat: chatId })
        .populate('sender')
        .exec();

      if (!messages) {
        throw new Error('Chat not found');
      }

      return messages;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
