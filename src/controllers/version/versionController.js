import fs from "fs"
export class VersionController {
  get() {
    const {version} = JSON.parse(fs.readFileSync('./package.json', {encoding: 'utf8'}))

    return {
      version
    }
  }
}
