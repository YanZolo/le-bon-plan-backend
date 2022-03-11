import fs from 'fs';
export class VersionController {
  get(): {version: string} {
    const { version } = JSON.parse(
      fs.readFileSync('./package.json', { encoding: 'utf8' })
    );

    return {
      version
    };
  }
}
