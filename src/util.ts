import chalk from 'chalk'
import * as path from 'path'

export const splitFilename = (filepath: string): { name: string, extension: string } => {
  const split = filepath.split('.')
  if (split.length !== 2) throw new Error(`could'nt recognize file: ${filepath}`)
  return {
    name: split[0],
    extension: split[1]
  }
}

export const processFilename = (filepath: string, srcDir: string, baseUrl: string) => {
  const split = splitFilename(filepath)
  let url = path.join(split.name)
  url = url.replace(path.join(srcDir), '')
  url = path.join(baseUrl, url)
  url = url.replace(/\/_/g, '/:')
  return url
}

export const requireWithoutCache = (filepath: string) => {
  const modulePath = path.resolve(filepath)
  delete require.cache[modulePath]
  return require(modulePath)
}

export const leftPad = (str: string, padding: number) => {
  let res = str
  for (let i = res.length; i < padding; i++) {
    res += ' '
  }
  return res
}

export const logError = (e: Error) => {
  console.clear()
  console.log(chalk.bgRed(' Error '))
  console.log(e)
}

export const logStart = () => {
  console.clear()
  console.log(chalk.bgBlueBright(' Start '))
}
