import type { RawAxiosRequestHeaders } from 'axios';

import type pty = require('node-pty');

export type Callback = (ptyProcess?: pty.IPty | string, data?: string) => void;

export interface Root {
  home: string;
  exec(cmd: string, cwd?: string, cb?: Callback): Promise<boolean>;
  down(
    url: string,
    dest: string,
    headers?: RawAxiosRequestHeaders,
  ): Promise<void>;
}

export type QueryRequest = {
  method: 'installed';
  prompt: string;
  model: string;
  seed: number;
  threads: number;
  n_predict: number;
  top_k: number;
  top_p: number;
  temp: number;
  batch_size: number;
  repeat_last_n: number;
  repeat_penalty: number;
  interactive: boolean;
  full: boolean;
  debug: boolean;
  skip_end: boolean;
  html: string;
};
