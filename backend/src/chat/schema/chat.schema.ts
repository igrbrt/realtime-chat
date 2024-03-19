import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 } from 'uuid';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  @Prop({
    type: String,
    default: function genUUID() {
      return v4();
    },
  })
  _id: string;
  @Prop({
    required: true,
  })
  users: String[];
  @Prop({ required: true })
  createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
