import prettier from 'prettier'

export default (contextModule) => {
  contextModule.string.formatCode = prettier.format(contextModule.string.code, {
    parser: 'babel',
    semi: false,
    singleQuote: true,
    printWidth: Infinity,
  })
}
