import { Context } from 'probot';
import { GithubDto } from '@/application/Github/GithubDto.js';
import { IJobOrchestratorInput } from '@/application/JobOrchestrator/IJobOrchestratorInput.js';
export class GithubContextAdapter {
  public static buildDto(ctx: Context): GithubDto {
    // -------- pull_request event ----------------------------------
    if (ctx.name === 'pull_request.opened') {
      return {
        repositoryName: ctx.repo().repo,
        config: ctx.config('phpaladin.yml'),
      } satisfies IJobOrchestratorInput;
    }
    throw new Error('Unsupported event type for GithubContextAdapter');
  }
}
