import { IUseCase } from '../IUseCase.js';
import { injectable } from 'inversify';
import { IJobAnalasysOutput } from './IJobAnalasysOutput.js';
import { IJobOrchestratorInput } from './IJobOrchestratorInput.js';

@injectable()
export class JobOrchestratorUseCase implements IUseCase<IJobOrchestratorInput, IJobAnalasysOutput> {
  public async execute(_input: IJobOrchestratorInput): Promise<IJobAnalasysOutput> {
    return { output: 'Hello World from Docker container!' };
  }
}
