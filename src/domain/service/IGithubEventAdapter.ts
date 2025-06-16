export interface IGithubEventAdapter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(event: string, handler: (context: any) => Promise<void>): void;
}
