import { Probot } from 'probot';
import { Kernel } from './infrastructure/ioc/Kernel.js';
import { ProbotEventAdapter } from './infrastructure/service/ProbotEventAdapter.js';
import { IEventRouter } from './domain/service/IEventRouter.js';
import { TYPES } from './infrastructure/ioc/types.js';
export default (app: Probot) => {
  const container = new Kernel();
  const adapter = new ProbotEventAdapter(app);

  const eventRegistrar = container.get<IEventRouter>(TYPES.IEventRouter);
  eventRegistrar.registerEvents(adapter);
};
