import { Container } from 'inversify';
import { IEventRouter } from '@/domain/service/IEventRouter.js';
import { EventRouter } from '@/infrastructure/service/EventRouter.js';
import { TYPES } from '@/infrastructure/ioc/types.js';
import { IContainerService } from '@/domain/service/IContainerRunnerService.js';
import { DockerodeContainerService } from '../service/DockerodeContainerService.js';
import { JobOrchestratorUseCase } from '@/application/JobOrchestrator/JobOrchestratorUseCase.js';
import { PullRequestOpenController } from '@/presentation/controller/PullRequestOpenController.js';

export class Kernel extends Container {
  public constructor() {
    super();
    this.configureDependencies();
  }

  private configureDependencies(): void {
    this.bind<IEventRouter>(TYPES.IEventRouter).to(EventRouter);
    this.bind(PullRequestOpenController).toSelf();
    this.bind<IContainerService>(TYPES.IContainerService).to(DockerodeContainerService);
    this.bind<JobOrchestratorUseCase>(JobOrchestratorUseCase).toSelf();
  }
}
