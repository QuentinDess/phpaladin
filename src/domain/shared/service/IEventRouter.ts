import { IGithubEventAdapter } from './IGithubEventAdapter.js';

export interface IEventRouter {
  registerEvents(app: IGithubEventAdapter): void;
}
