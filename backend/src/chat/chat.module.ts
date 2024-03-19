import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schema/chat.schema';
import { Message, MessageSchema } from './schema/message.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    UserModule,
  ],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
