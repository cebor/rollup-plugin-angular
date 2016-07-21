import buble from 'rollup-plugin-buble';

var external = Object.keys(require('./package.json').dependencies).concat(['fs', 'path']);

export default {
	entry: 'src/index.js',
	plugins: [ buble() ],
	external: external,
  targets: [
		{ dest: 'dist/rollup-plugin-angular.js', format: 'cjs' },
		{ dest: 'dist/rollup-plugin-angular.esm.js', format: 'es' }
	]
};
