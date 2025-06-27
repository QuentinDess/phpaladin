import { IGithubDto } from '../Github/GithubDto.js';

export interface IJobOrchestratorInput extends IGithubDto {
  config: object;
}
