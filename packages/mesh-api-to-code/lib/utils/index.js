import fsPromises from 'node:fs/promises'
export const readFile = path => fsPromises.readFile(path, `utf-8`)
export const parseJSON = json => JSON.parse(json)
export const stringifyJSON = json => JSON.stringify(json, null, 2)
