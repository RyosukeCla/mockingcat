import chalk from 'chalk'

export const splitFilename = (filename: string): { name: string, extension: string } => {
  const split = filename.split('.')
  if (split.length !== 2) throw new Error(`could'nt recognize file: ${filename}`)
  return {
    name: split[0],
    extension: split[1]
  }
}

export const processFilename = (filename: string) => {
  const split = splitFilename(filename)
  if (!require.extensions['.' + split.extension]) throw new Error(`override require hook to load '.${split.extension}'`)
  return split.name.replace(/\/_/, '/:')
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
