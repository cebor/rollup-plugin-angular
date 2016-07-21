[![Build Status](https://travis-ci.org/cebor/rollup-plugin-angular.svg?branch=master)](https://travis-ci.org/cebor/rollup-plugin-angular)

# rollup-plugin-angular
Angular2 template and styles inliner

```bash
npm install --save-dev rollup-plugin-angular
```

## Example rollup.config.js

```javascript
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
