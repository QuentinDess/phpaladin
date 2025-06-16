import { IEventRouter } from '@/domain/service/IEventRouter.js';
import { inject, injectable } from 'inversify';
import { ProbotEventAdapter } from '@/infrastructure/service/ProbotEventAdapter.js';

import { IssueOpenController } from '@/presentation/controller/IssueOpenController.js';

@injectable()
export class EventRouter implements IEventRouter {
  public constructor(
    @inject(IssueOpenController) private readonly _issueOpenController: IssueOpenController,
  ) {}
  // Helper method to register events (called from main app)
  registerEvents(app: ProbotEventAdapter): void {
    app.on('issues.opened', async (context) => {
      console.log(typeof context);
      this._issueOpenController.handle(context);
    });
  }
}
