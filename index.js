'use strict'

// base on:
//  https://github.com/htmllint/htmllint-spellcheck/blob/master/lib/spellcheck.js
//  https://github.com/htmllint/htmllint/blob/master/lib/rules/tag-name-lowercase.js
//  https://github.com/htmllint/htmllint/blob/master/lib/rules/attr-name-style.js

const proc = require('htmllint/lib/process_option')
const Issue = require('htmllint/lib/issue')
const toLowerCase = v => v.toLowerCase()

const svgTags = require('svg-tags').map(toLowerCase)
const htmlTags = require('html-tags').map(toLowerCase)
const mathMLTags = require('mathml-tag-names').map(toLowerCase)

// main

const customTagStyle = {
  name: 'custom-tag-style',
  on: ['tag'],
  options: [{
    process: proc.format,
    desc: [
      'If set, custom tag name must match with pattern.',
      'Only the opening tag is checked; mismatches between open and close tags',
      'are checked by `tag-name-match`.'
    ].join('\n')
  }, {
    process: proc.format,
    name: 'custom-tag-ignore-regexp',
    desc: [
      'The value is either a string giving a regular expression or `false`. If',
      'set, `tag`s matching the given regular expression are ignored',
      'for the `custom-tag-style` rule.'
    ].join('\n')
  }]
}

customTagStyle.lint = function (element, opts) {
  const format = opts[this.name]
  if (!format)
    return []

  const tagName = element.name
  const tagNameLowerCase = tagName.toLowerCase()

  if (false
    || htmlTags.indexOf(tagNameLowerCase) !== -1
    || svgTags.indexOf(tagNameLowerCase) !== -1
    || mathMLTags.indexOf(tagNameLowerCase) !== -1
  ) {
    return []
  }

  const ignore = opts['custom-tag-ignore-regexp']
  if (ignore && ignore.test(tagNameLowerCase))
    return []

  return !format.test(tagNameLowerCase)
    ? new Issue('E011', element.openLineCol, { format: format.desc, tag: tagName })
    : []
}

// export

module.exports = { rules: [ customTagStyle ] }
