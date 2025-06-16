import { IUseCase } from '../IUseCase.js';
import { IGenerateRandomWordDtoInput } from '@/application/GenerateRandomWorld/IGenerateRandomWordDtoInput.js';
import { IGenerateRandomWordDtoOutput } from '@/application/GenerateRandomWorld/IGenerateRandomWordDtoOutput.js';
import { IContainerService } from '@/domain/service/IContainerRunnerService.js';
import { TYPES } from '@/infrastructure/ioc/types.js';
import { inject, injectable } from 'inversify';

@injectable()
export class GenerateRandomWorldUseCase
  implements IUseCase<IGenerateRandomWordDtoInput, IGenerateRandomWordDtoOutput>
{
  public constructor(
    @inject(TYPES.IContainerService) private readonly _containerService: IContainerService,
  ) {}

  public async execute(_input: IGenerateRandomWordDtoInput): Promise<IGenerateRandomWordDtoOutput> {
    return await this._containerService.run({
      Image: 'alpine',
      Cmd: ['sh', '-c', 'tr -dc a-z </dev/urandom | head -c 6; echo'],
      Tty: false,
      AttachStdout: true,
      AttachStderr: true,
    });
  }
}
