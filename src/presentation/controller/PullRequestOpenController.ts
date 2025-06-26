import { IGithubContextDtoInput } from '@/application/Github/IGithubContextDtoInput.js';
import { JobOrchestratorUseCase } from '@/application/JobOrchestrator/JobOrchestratorUseCase.js';
import { GithubContextAdapter } from '@/infrastructure/service/GithubContextAdapter.js';
import { inject, injectable } from 'inversify';

import { Context } from 'probot';

@injectable()
export class PullRequestOpenController {
  public constructor(@inject(JobOrchestratorUseCase) private _useCase: JobOrchestratorUseCase) {}

  public async handle(context: Context): Promise<void> {
    // Handle the issue opened event
    console.log('Pull request opened:', context);
    const jobOrchestratorInput = GithubContextAdapter.toDto<IGithubContextDtoInput>(context);

    const result = await this._useCase.execute(jobOrchestratorInput);

    await context.octokit.rest.pulls.createReview({
      pull_number: context.pullRequest().pull_number,
      owner: context.repo().owner,
      repo: context.repo().repo,
      body: 'Job orchestrator output: ' + result.output,
      event: 'COMMENT',
    });
  }
}
