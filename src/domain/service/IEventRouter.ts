import { IGithubEventAdapter } from '@/domain/service/IGithubEventAdapter.js';

export interface IEventRouter {
  registerEvents(app: IGithubEventAdapter): void;
}
