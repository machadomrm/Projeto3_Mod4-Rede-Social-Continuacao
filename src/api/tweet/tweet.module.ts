import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register(
      {
        defaultStrategy: "jwt",
        property:"usuario",
        session: false,
      })
  ],
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}
