import { IGithubEventAdapter } from '@/domain/shared/service/IGithubEventAdapter.js';

export interface IEventRouter {
  registerEvents(app: IGithubEventAdapter): void;
}
