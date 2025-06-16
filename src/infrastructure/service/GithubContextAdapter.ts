import { Context } from 'probot';

export class GithubContextAdapter {
  public static toDto<TDto>(githubContext: Context): TDto {
    return {
      repository: githubContext.repo,
    } as TDto;
  }
}
