
import { rollup } from 'rollup';
import * as commonjs from 'rollup-plugin-commonjs';
import * as nodeResolve from 'rollup-plugin-node-resolve';
import * as typescript from 'rollup-plugin-typescript';
import { expect, assert } from 'chai';
import * as angular from '../../dist/rollup-plugin-angular.js';
import * as colors from 'colors';

process.chdir('test');


const bundle = () => {
  return rollup({
    entry: 'mochats/component.ts',
    plugins: [
      angular(),
      commonjs(),
      typescript({
        typescript: require('./../../node_modules/typescript')
      })
    ]
  });
}

describe('rollup-plugin-angular', () => {
  console.info(`-------------------`);
  console.info(colors.blue(`start test mocha:ts`));
  console.info(`-------------------`);
  beforeEach(() => {

  });
  it('should not have example-component.html file content loaded from comment', () => {
    return bundle()
      .then(bundle => {
        return bundle
          .generate({ format: 'iife', moduleName: 'component' })
          .then(generated => {
            assert.ok(generated.code);
            expect(generated.code.includes(`example-component.html content loaded`)).to.equal(false);
            return generated;
          });
      });
	});

  it('should have component.html file content loaded', () => {
    return bundle()
      .then(bundle => {
        return bundle
          .generate({ format: 'iife', moduleName: 'component' })
          .then(generated => {
            assert.ok(generated.code);
            expect(generated.code.includes(`component.html content loaded`)).to.equal(true);
            return generated;
          });
      });
	});
});
