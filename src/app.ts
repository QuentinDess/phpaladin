import { Probot } from 'probot';
import { Kernel } from './infrastructure/shared/ioc/Kernel.js';
import { ProbotEventAdapter } from './infrastructure/shared/service/ProbotEventAdapter.js';
import { IEventRouter } from './domain/shared/service/IEventRouter.js';
import { TYPES } from './infrastructure/shared/ioc/types.js';
export default (app: Probot) => {
  const container = new Kernel();
  const adapter = new ProbotEventAdapter(app);

  const eventRegistrar = container.get<IEventRouter>(TYPES.IEventRouter);
  eventRegistrar.registerEvents(adapter);
};
