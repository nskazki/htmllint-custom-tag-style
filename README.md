# htmllint-custom-tag-style

[htmllint](https://github.com/htmllint/htmllint) plugin to check custom tag naming.

```bash
yarn add -D htmllint-custom-tag-style
```

**.htmllintrc**
```js
{
  "plugins": [
    "htmllint-custom-tag-style"
  ],
  "tag-name-match": true,                  // each tag should be closed
  "custom-tag-style": "/^app-prefix-.+$/", // custom tag only pattern
  "custom-tag-ignore-regexp": "/^%.*$/"    // ignore ejs stuff
}
```
