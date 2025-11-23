import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

import { IAssinatura } from './models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('planos-ativos/:codAss')
  async getActivePlans(): Promise<IAssinatura[]> {
    return await this.appService.getActivePlans();
  }
}
