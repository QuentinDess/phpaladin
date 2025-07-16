import { IContainerConfig } from '@/domain/entity/container/IContainerConfig.js';
import { IContainerResult } from '@/domain/entity/container/IContainerResult.js';

export interface IContainerService {
  run(config: IContainerConfig): Promise<IContainerResult>;
}
