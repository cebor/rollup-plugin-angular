
import { rollup } from 'rollup';
import * as commonjs from 'rollup-plugin-commonjs';
import * as nodeResolve from 'rollup-plugin-node-resolve';
import * as typescript from 'rollup-plugin-typescript';
import { expect, assert } from 'chai';
import * as angular from '../../dist/rollup-plugin-angular.js';

process.chdir('test');

describe('rollup-plugin-angular', () => {
  it('should not have <example-component-html></example-component-html>', () => {
    return rollup({
        entry: 'mochats/test.component.ts',
        plugins: [
          angular(),
          commonjs(),
          typescript({
            typescript: require('./../../node_modules/typescript')
          })
        ]
      })
      .then(bundle => {
        return bundle
          .generate({ format: 'iife', moduleName: 'component' })
          .then(generated => {
            expect(generated.code.includes(`<example-component-html></example-component-html>`)).to.equal(false);
            assert.ok(generated.code);
            return generated;
          });
      });
	});
});
