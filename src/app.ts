import 'reflect-metadata';
import { Probot } from 'probot';
import { Kernel } from './infrastructure/shared/ioc/Kernel.js';
import { ProbotEventAdapter } from './infrastructure/shared/service/ProbotEventAdapter.js';
import { IEventRouter } from './domain/shared/service/IEventRouter.js';
import { TYPES } from './infrastructure/shared/ioc/types.js';
export default (_app: Probot) => {
  console.log(_app);
  const container = new Kernel();
  const adapter = new ProbotEventAdapter(_app);

  const eventRegistrar = container.get<IEventRouter>(TYPES.IEventRouter);
  eventRegistrar.registerEvents(adapter);
};
