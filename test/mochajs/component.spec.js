const { rollup } = require('rollup');
const assert = require('chai').assert;
const expect = require('chai').expect;
const angular = require('../../dist/rollup-plugin-angular.js');
const external = Object.keys(require('./../../package.json').dependencies).concat(['fs', 'path']);
const colors = require('colors');
const sass = require('node-sass');
const cleanCSS = require('clean-css');
const htmlMinifier = require('html-minifier');
const cssmin = new cleanCSS();
const htmlminOpts = {
  caseSensitive: true,
  collapseWhitespace: true,
  removeComments: true
};

process.chdir('test');

describe('rollup-plugin-angular', () => {
  console.info(`-------------------`);
  console.info(colors.blue(`start test mocha:js`));
  console.info(`-------------------`);
  it('should not have component.html file content loaded from comment', () => {
    return rollup({
      input: 'mochajs/component.js',
        external: external,
        plugins: [
          angular({
            replace: false
          })
        ]
      })
      .then(bundle => {
        return bundle
          .generate({
            format: 'umd',
            name: 'component'
          })
          .then(generated => {
            expect(generated.code.includes(`component.html content loaded`)).to.equal(false);
            assert.ok(generated.code);
          });
      });
	});

  it('should have example-component.html file content loaded', () => {
    return rollup({
        input: 'mochajs/example-component.js',
        external: external,
        plugins: [
          angular({
            preprocessors: {
              template: template => htmlMinifier.minify(template, htmlminOpts),
              style: scss => {
                const css = sass.renderSync({ data: scss }).css;
                return cssmin.minify(css).styles;
              },
            }
          })
        ]
      })
      .then(bundle => {
        return bundle
          .generate({
            format: 'umd',
            name: 'component'
          })
          .then(generated => {
            expect(generated.code.includes(`blaah`)).to.equal(true);
            assert.ok(generated.code);
          });
      });
	});
});
