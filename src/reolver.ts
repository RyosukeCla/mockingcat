import * as fs from 'fs'
import * as path from 'path'

const resolver = (dirPath: string, files: string[] = []) => {
  const _dirPath = path.join(dirPath)
  const dir = fs.readdirSync(_dirPath)
  dir.forEach((name => {
    const filePath = path.join(_dirPath, name)
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      const deepDirPath = path.join(dirPath, name)
      resolver(deepDirPath, files)
    } else {
      files.push(path.join(_dirPath, name))
    }
  }))

  return files
}

export default resolver
