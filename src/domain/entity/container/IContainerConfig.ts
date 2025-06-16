export interface IContainerConfig {
  Image: string;
  Cmd?: string[];
  AttachStdout?: boolean;
  AttachStderr?: boolean;
  Tty?: boolean;
}
