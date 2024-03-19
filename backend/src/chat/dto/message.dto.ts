import UserDto from '../../user/dto/user.dto';
import ChatDto from './chat.dto';

export default class MessageDto {
  _id: string;
  sender: UserDto;
  content: string;
  chat: ChatDto;
  createdAt: Date;
}
