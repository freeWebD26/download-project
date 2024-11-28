import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@app/common';
import { ReservationsModule } from './apps/reservations/src/reservations/reservations.module';
import { ChatModule } from './apps/chat/chat.module';

@Module({
  imports: [ReservationsModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
