/* eslint-disable @typescript-eslint/no-explicit-any */
import { Probot } from 'probot';
import { IGithubEventAdapter } from '@/domain/service/IGithubEventAdapter.js';

export class ProbotEventAdapter implements IGithubEventAdapter {
  public constructor(private readonly probot: Probot) {}

  on(event: string, handler: (context: any) => Promise<void>): void {
    this.probot.on(event as any, handler);
  }
}
