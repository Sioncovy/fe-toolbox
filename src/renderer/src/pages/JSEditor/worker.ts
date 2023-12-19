import * as Comlink from 'comlink'

export type Log = {
  value: unknown
  type: string
}

const remote = {
  executeJavaScript: (code: string) => {
    const result: Log[][] = []
    const originalConsoleLog = console.log
    console.log = (...args: unknown[]) => {
      const t: Log[] = []
      for (let i = 0; i < args.length; i++) {
        const value = args[i]
        const type = typeof value
        t.push({
          value: type === 'object' ? JSON.stringify(value) : value,
          type
        })
      }
      result.push(t)
    }
    eval(code)
    console.log = originalConsoleLog
    return result
  }
}

export type Remote = typeof remote

Comlink.expose(remote)

export {}
