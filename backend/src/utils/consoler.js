import { Timestamp } from '@sapphire/time-utilities'
import { cyan, red, gray, yellow, white, green, magenta } from 'colorette'

export const log = (content, type = 'log') => {
  const timestamp = `[${cyan(new Timestamp('YYYY-MM-DD HH:mm:ss'))}]:`

  switch (type) {
    case 'log':
      return console.log(`${timestamp} ${gray(type.toUpperCase())} ${content}`)
    case 'warn':
      return console.log(
        `${timestamp} ${yellow(type.toUpperCase())} ${content}`
      )
    case 'error':
      return console.log(`${timestamp} ${red(type.toUpperCase())} ${content}`)
    case 'debug':
      return console.log(
        `${timestamp} ${magenta(type.toUpperCase())} ${content}`
      )
    case 'cmd':
      return console.log(`${timestamp} ${white(type.toUpperCase())} ${content}`)
    case 'ready':
      return console.log(`${timestamp} ${green(type.toUpperCase())} ${content}`)
    default:
      throw new TypeError(
        'Logger must be either warn, debug, log, ready, cmd, or error'
      )
  }
}

export const error = (...args) => this.log(...args, 'error')
export const warn = (...args) => this.log(...args, 'warn')
export const debug = (...args) => this.log(...args, 'debug')
export const cmd = (...args) => this.log(...args, 'cmd')
export const ready = (...args) => this.log(...args, 'ready')
