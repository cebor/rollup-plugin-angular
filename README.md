[![Build Status](https://travis-ci.org/cebor/rollup-plugin-angular.svg?branch=master)](https://travis-ci.org/cebor/rollup-plugin-angular)

# rollup-plugin-angular
Angular2 template and styles inliner for rollup

## Looking for new maintainer
I have no time to maintain this plugin anymore. So im looking for a new Maintainer. Feel free to create an issue, when you want to maintain this plugin.

## Installation
```bash
npm install --save-dev rollup-plugin-angular
```

## Example
```javascript
// rollup.config.js
import angular from 'rollup-plugin-angular';
import typescript from 'rollup-plugin-typescript';
import alias from 'rollup-plugin-alias';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/main.ts',
  format: 'iife',
  dest: 'dist/bundle.js',
  plugins: [
    angular(),
    typescript(),
    alias({ rxjs: __dirname + '/node_modules/rxjs-es' }), // rxjs fix (npm install rxjs-es)
    nodeResolve({ jsnext: true, main: true })
  ]
}
```

## Template & Style preprocessing
You may need to do some preprocessing on your templates & styles such as minification and/or transpilation.

To do this you can pass a preprocessors object as an option, containing a style and/or template preprocessor.

If you are using rollup on a source that has already been transpiled to JavaScript you will also need to set the sourcetype.

### Signature
```typescript
sourcetype: 'js' //defaults to 'ts'
preprocessors: {
  template: (source: string, path: string) => string,
  style: (source: string, path: string) => string,
}
```
`source` - The contents of the style or template's file.

`path` - The path to the loaded file. Can be useful for checking file extensions for example.

returns the manipulated source as a string.

### Example
The following example shows how you can use sass, clean-css (for css minification), and htmlmin.

```javascript
// rollup.config.js
import angular from 'rollup-plugin-angular';
import typescript from 'rollup-plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';
import sass from 'node-sass';
import CleanCSS from 'clean-css';
import { minify as minifyHtml } from 'html-minifier';

const cssmin = new CleanCSS();
const htmlminOpts = {
    caseSensitive: true,
    collapseWhitespace: true,
    removeComments: true,
};

export default {
  input: 'src/main.ts',
  output: {
    format: 'umd',
    file: 'dist/bundle.js'
  },
  plugins: [
    angular({
      // additional replace `templateUrl` and `stylesUrls` in every `.js` file
      // default: true
      replace: false, 
      preprocessors: {
        template: template => minifyHtml(template, htmlminOpts),
        style: scss => {
            const css = sass.renderSync({ data: scss }).css;
            return cssmin.minify(css).styles;
        },
      }
    })
    typescript(),
    nodeResolve({ jsnext: true, main: true })
  ]
}
```
