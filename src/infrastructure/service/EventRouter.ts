import { IEventRouter } from '@/domain/service/IEventRouter.js';
import { inject, injectable } from 'inversify';
import { ProbotEventAdapter } from '@/infrastructure/service/ProbotEventAdapter.js';

import { PullRequestOpenController } from '@/presentation/controller/PullRequestOpenController.js';

@injectable()
export class EventRouter implements IEventRouter {
  public constructor(
    @inject(PullRequestOpenController)
    private readonly _pullRequestOpenController: PullRequestOpenController,
  ) {}
  // Helper method to register events (called from main app)
  registerEvents(app: ProbotEventAdapter): void {
    app.on('pull_request.opened', async (context) => {
      this._pullRequestOpenController.handle(context);
    });
  }
}
