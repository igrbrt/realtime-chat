import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { v4 } from 'uuid';
import { User } from '../../user/schema/user.schema';
import { Chat } from './chat.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({
    type: String,
    default: function genUUID() {
      return v4();
    },
  })
  _id: string;
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  sender: User;
  @Prop({ required: true })
  content: string;
  @Prop({ required: true, type: Types.ObjectId, ref: 'Chat' })
  chat: Chat;
  @Prop({ required: true })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
