import 'reflect-metadata';
import { IEventRouter } from '@/domain/shared/service/IEventRouter.js';
import { injectable } from 'inversify';
import { ProbotEventAdapter } from './ProbotEventAdapter.js';
import Docker from 'dockerode';
import Stream from 'stream';

@injectable()
export class EventRouter implements IEventRouter {
  // Helper method to register events (called from main app)
  registerEvents(app: ProbotEventAdapter): void {
    app.on('issues.opened', async (context) => {
      const randomWord = await runDummyContainer();
      const issueComment = context.issue({
        body: 'Random word generated from Docker container: ' + randomWord,
      });

      await context.octokit.issues.createComment(issueComment);
    });
    async function runDummyContainer(): Promise<string> {
      const docker = new Docker({
        host: process.env.DOCKER_HOST,
        protocol: 'http',
        port: parseInt(process.env.DOCKER_PORT || '2375', 10),
      });
      await new Promise((resolve, reject) => {
        docker.pull('alpine', (err: Error, stream: NodeJS.ReadableStream) => {
          if (err) return reject(err);
          docker.modem.followProgress(stream, onFinished);

          function onFinished(err: Error | null) {
            if (err) return reject(err);
            resolve(null);
          }
        });
      });

      const container = await docker.createContainer({
        Image: 'alpine',
        Cmd: ['sh', '-c', 'tr -dc a-z </dev/urandom | head -c 6; echo'],
        Tty: false,
        AttachStdout: true,
        AttachStderr: true,
      });

      await container.start();

      return new Promise<string>((resolve, reject) => {
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
              resolve(output.trim());
            });

            stream.on('error', reject);
          },
        );
      });
    }
  }
}
