#!/usr/bin/env node
'use strict'

const fs = require('fs-extra')
const prettier = require('prettier')

const cwd = process.cwd()

const {createContext} = require('./context')
const translateApi = require('./translate-api')

;(async () => {
  const apiDirectories = await fs.readdir(`${cwd}/apis`)
  for (let apiDirectoryName of apiDirectories) {
    const apiDirectory = `${cwd}/apis/${apiDirectoryName}`
    const apiConfig = `${apiDirectory}/api.config.js`
    const context = await createContext({
      cwd,
      apiDirectory,
      apiConfig,
    })
    translateApi(context)
    const distDirectory = `${cwd}/dist/${apiDirectoryName}`
    await fs.ensureDir(distDirectory)
    const distFile = `${distDirectory}/index.js`
    const formatCode = prettier.format(context.string.code, {
      parser: 'babel',
      semi: false,
      singleQuote: true,
      printWidth: Infinity,
    })
    await fs.outputFile(distFile, formatCode)
  }
})()
