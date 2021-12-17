const prettier = require('prettier')

module.exports = (context) => {
  context.string.formatCode = prettier.format(context.string.code, {
    parser: 'babel',
    semi: false,
    singleQuote: true,
    printWidth: Infinity,
  })
}
