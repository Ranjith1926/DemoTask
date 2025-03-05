const postCssImport = require('postcss-import')
const postCssInlineMedia = require('postcss-inline-media')
const postCssForVariables = require('postcss-for-variables')
const postCssFor = require('postcss-for')
const postCssInsert = require('postcss-insert')
const postCssNested = require('postcss-nested')
const cssNano = require('cssnano')
const postCssMixins = require('postcss-mixins')
const postCssCalc = require('postcss-calc')

module.exports = {
  plugins: [
    postCssImport,
    postCssNested,
    postCssMixins,
    postCssInlineMedia,
    postCssCalc,
    postCssForVariables,
    postCssFor,
    postCssInsert,
    cssNano({
      preset: 'default'
    })
  ]
}
