import 'reflect-metadata';
import { Container } from 'inversify';
// import { TYPES } from "@/infrastructure/ioc/types.js";
import { buildProviderModule } from 'inversify-binding-decorators';
import { IEventRouter } from '@/domain/shared/service/IEventRouter.js';
import { EventRouter } from '../service/EventRouter.js';
import { TYPES } from './types.js';

export class Kernel extends Container {
  public constructor() {
    super();
    this.configureDependencies();
    this.load(buildProviderModule());
  }

  private configureDependencies(): void {
    this.bind<IEventRouter>(TYPES.IEventRouter).to(EventRouter);
  }
}
