import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

import { IAssinatura } from './models';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('PagamentoPlanoServicoPlanosAtivos')
  async processPaymentEvent() {
    await this.appService.clearPlansFromCache();
  }

  @Get('planos-ativos/:codAss')
  async getActivePlans(): Promise<IAssinatura[]> {
    return await this.appService.getActivePlans();
  }
}
