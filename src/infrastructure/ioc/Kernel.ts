import { Container } from 'inversify';
import { IEventRouter } from '@/domain/service/IEventRouter.js';
import { EventRouter } from '@/infrastructure/service/EventRouter.js';
import { TYPES } from '@/infrastructure/ioc/types.js';
import { IssueOpenController } from '@/presentation/controller/IssueOpenController.js';
import { GenerateRandomWorldUseCase } from '@/application/GenerateRandomWorld/GenerateRandomWorldUseCase.js';
import { IContainerService } from '@/domain/service/IContainerRunnerService.js';
import { DockerodeContainerService } from '../service/DockerodeContainerService.js';

export class Kernel extends Container {
  public constructor() {
    super();
    this.configureDependencies();
  }

  private configureDependencies(): void {
    this.bind<IEventRouter>(TYPES.IEventRouter).to(EventRouter);
    this.bind(IssueOpenController).toSelf();
    this.bind<IContainerService>(TYPES.IContainerService).to(DockerodeContainerService);
    this.bind<GenerateRandomWorldUseCase>(GenerateRandomWorldUseCase).toSelf();
  }
}
