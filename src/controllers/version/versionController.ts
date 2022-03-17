import fs from 'fs';
export class VersionController {
  get(): { version: string } {
    const { version } = JSON.parse(
      // fixed error with rule "@typescript-eslint/no-unsafe-assignment": "off"
      fs.readFileSync('./package.json', { encoding: 'utf8' })
    );

    return {
      version
    };
  }
}
