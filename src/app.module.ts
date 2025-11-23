import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import 'dotenv/config';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'SERVICO_PLANOS_ATIVOS',
        transport: Transport.RMQ,
        options: {
          urls: [`${process.env.RMQ_URL}`],
          queue: 'planos-ativos',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
