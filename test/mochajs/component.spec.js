const { rollup } = require('rollup');
const assert = require('chai').assert;
const expect = require('chai').expect;
const angular = require('../../dist/rollup-plugin-angular.js');
const external = Object.keys(require('./../../package.json').dependencies).concat(['fs', 'path']);
const colors = require('colors');

process.chdir('test');

describe('rollup-plugin-angular', () => {
  console.info(`-------------------`);
  console.info(colors.blue(`start test mocha:js`));
  console.info(`-------------------`);
  it('should not have component.html file content loaded from comment', () => {
    return rollup({
        entry: 'mochajs/component.js',
        external: external,
        plugins: [
          angular()
        ]
      })
      .then(bundle => {
        return bundle
          .generate({ format: 'iife', moduleName: 'component' })
          .then(generated => {
            expect(generated.code.includes(`component.html content loaded`)).to.equal(false);
            assert.ok(generated.code);
          });
      });
	});

  it('should have example-component.html file content loaded', () => {
    return rollup({
        entry: 'mochajs/example-component.js',
        external: external,
        plugins: [
          angular()
        ]
      })
      .then(bundle => {
        return bundle
          .generate({ format: 'umd', moduleName: 'component' })
          .then(generated => {
            expect(generated.code.includes(`blaah`)).to.equal(true);
            assert.ok(generated.code);
          });
      });
	});
});
