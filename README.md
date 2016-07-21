# rollup-plugin-angular
Angular2 template/style inliner

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
    alias({ rxjs: __dirname + '/node_modules/rxjs-es' }), // rxjs fix
    nodeResolve({ jsnext: true, main: true })
  ]
}
```
