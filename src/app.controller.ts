import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

import { isActiveSubscription } from './utils';

import { IAssinatura } from './models';
import { AxiosResponse } from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('planos-ativos/:codAss')
  async getActivePlans(): Promise<IAssinatura[]> {
    const response: AxiosResponse<IAssinatura[]> =
      await this.appService.getActivePlans();

    const subscriptions = response.data;

    const activeSubscriptions = subscriptions.filter((s) => {
      return isActiveSubscription(s.dataUltimoPagamento);
    });

    return activeSubscriptions;
  }
}
