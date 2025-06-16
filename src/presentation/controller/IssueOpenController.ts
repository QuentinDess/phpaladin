import { GenerateRandomWorldUseCase } from '@/application/GenerateRandomWorld/GenerateRandomWorldUseCase.js';
import { IGenerateRandomWordDtoInput } from '@/application/GenerateRandomWorld/IGenerateRandomWordDtoInput.js';
import { GithubContextAdapter } from '@/infrastructure/service/GithubContextAdapter.js';
import { inject, injectable } from 'inversify';

import { Context } from 'probot';

@injectable()
export class IssueOpenController {
  public constructor(
    @inject(GenerateRandomWorldUseCase) private _useCase: GenerateRandomWorldUseCase,
  ) {}

  public async handle(context: Context): Promise<void> {
    // Handle the issue opened event
    console.log('Issue opened:', context);
    const generateRandomWorldDtoInput =
      GithubContextAdapter.toDto<IGenerateRandomWordDtoInput>(context);

    const result = await this._useCase.execute(generateRandomWorldDtoInput);
    const issueComment = context.issue({
      body: 'Random word generated from Docker container: ' + result.output,
    });

    await context.octokit.issues.createComment(issueComment);
  }
}
