import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChatGateway } from './chat/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ChatModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ChatGateway],
  controllers: [AppController],
})
export class AppModule {}
