import { IContainerConfig } from '@/domain/entity/container/IContainerConfig.js';
import { IContainerResult } from '@/domain/entity/container/IContainerResult.js';
import { IContainerService } from '@/domain/service/IContainerRunnerService.js';
import Dockerode from 'dockerode';
import Docker from 'dockerode';
import Stream from 'stream';
export class DockerodeContainerService implements IContainerService {
  public docker: Dockerode;
  public constructor() {
    this.docker = new Docker({
      host: process.env.DOCKER_HOST,
      protocol: 'http',
      port: parseInt(process.env.DOCKER_PORT || '2375', 10),
    });
  }
  public async run(config: IContainerConfig): Promise<IContainerResult> {
    await new Promise((resolve, reject) => {
      this.docker.pull('alpine', (err: Error, stream: NodeJS.ReadableStream) => {
        if (err) return reject(err);
        this.docker.modem.followProgress(stream, onFinished);

        function onFinished(err: Error | null) {
          if (err) return reject(err);
          resolve(null);
        }
      });
    });
    const container = await this.docker.createContainer(config);
    await container.start();
    return new Promise<IContainerResult>((resolve, reject) => {
      let output = '';
      const logStream = new Stream.PassThrough();

      logStream.on('data', (chunk: Buffer) => {
        output += chunk.toString('utf8');
      });

      container.logs(
        { follow: true, stdout: true, stderr: true },
        (err: Error, stream: NodeJS.ReadableStream | undefined) => {
          if (err || !stream) {
            err = err || new Error('No stream returned');
            reject(err);
            return;
          }

          container.modem.demuxStream(stream, logStream, logStream);

          stream.on('end', async () => {
            await container.remove();
            resolve({
              output: output.trim(),
              exitCode: 0,
            } as IContainerResult);
          });

          stream.on('error', async (err: Error) => {
            await container.remove();
            resolve({
              output: err.message,
              exitCode: 1,
            } as IContainerResult);
          });
        },
      );
    });
  }
}
