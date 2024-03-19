import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Factory } from 'nestjs-seeder';
import { v4 } from 'uuid';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Factory(() => v4())
  @Prop({
    type: String,
    default: function genUUID() {
      return v4();
    },
  })
  _id: string;

  @Factory((faker) => faker.person.fullName())
  @Prop()
  name: string;

  @Factory((faker) => faker.helpers.arrayElement(['CLIENT', 'ADMIN']))
  @Prop()
  type: 'CLIENT' | 'ADMIN';
}

export const UserSchema = SchemaFactory.createForClass(User);
