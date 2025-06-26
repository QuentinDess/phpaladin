import { IUseCase } from '../IUseCase.js';
import { injectable } from 'inversify';
import { IJobAnalasysOutput } from './IJobAnalasysOutput.js';
import { IGithubContextDtoInput } from '../Github/IGithubContextDtoInput.js';

@injectable()
export class JobOrchestratorUseCase
  implements IUseCase<IGithubContextDtoInput, IJobAnalasysOutput>
{
  public async execute(_input: IGithubContextDtoInput): Promise<IJobAnalasysOutput> {
    return { output: 'Hello World from Docker container!' };
  }
}
