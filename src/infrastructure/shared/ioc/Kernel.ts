import { Container } from 'inversify';
import { IEventRouter } from '@/domain/shared/service/IEventRouter.js';
import { EventRouter } from '@/infrastructure/shared/service/EventRouter.js';
import { TYPES } from '@/infrastructure/shared/ioc/types.js';

export class Kernel extends Container {
  public constructor() {
    super();
    this.configureDependencies();
  }

  private configureDependencies(): void {
    this.bind<IEventRouter>(TYPES.IEventRouter).to(EventRouter);
  }
}
