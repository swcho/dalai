import fs from 'fs';
import { Terminal, terminal as term } from 'terminal-kit';
import WebTorrent from 'webtorrent';

declare module 'webtorrent' {
  interface Torrent {
    on(event: 'metadata', callback: (metadata: any) => void): this;
  }
  interface TorrentFile {
    readonly size: number;
  }
}

class TorrentDownloader {
  client: WebTorrent.Instance;
  start: {};
  progressBar: { [url: string]: Terminal.ProgressBarController };
  constructor() {
    this.client = new WebTorrent();
    this.start = {};
    this.progressBar = {};
  }
  add(url, folder, cb) {
    return new Promise((resolve, reject) => {
      const e = fs.existsSync(folder);
      if (!e) {
        fs.mkdirSync(folder, { recursive: true });
      }
      this.client.add(url, { path: folder }, (torrent) => {
        this.progressBar[url] = term.progressBar({
          width: 120,
          title: torrent.name,
          eta: true,
          percent: true,
        });
        torrent.on('metadata', (m) => {
          this.start[torrent.name] = Date.now();
          console.log({ metadata: m });
          term('\n');
        });
        torrent.on('download', (bytes) => {
          if (cb) {
            cb({
              progress: torrent.progress,
              speed: torrent.downloadSpeed,
              downloaded: torrent.downloaded,
            });
          }
          this.progressBar[url].update(torrent.progress);
        });
        torrent.on('done', () => {
          console.log('torrent download finished');
          const end = Date.now();
          const elapsed = end - this.start[torrent.name];
          console.log({ start: this.start[torrent.name], end: end, elapsed });
          this.progressBar[url].update(1);
          term('\n');
          resolve(torrent);
          for (const file of torrent.files) {
            // do something with file
            console.log('file', file.name, file.size);
          }
        });
      });
    });
  }
}

export default TorrentDownloader;
