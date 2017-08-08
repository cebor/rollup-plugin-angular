const { rollup } = require('rollup');
const assert = require('chai').assert;
const expect = require('chai').expect;
const angular = require('../../dist/rollup-plugin-angular.js');
const external = Object.keys(require('./../../package.json').dependencies).concat(['fs', 'path']);

process.chdir('test');

describe('rollup-plugin-angular', () => {
  it('should not have <component-html></component-html>', () => {
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
            expect(generated.code.includes(`<component-html></component-html>`)).to.equal(false);
            assert.ok(generated.code);
          });
      });
	});
});
