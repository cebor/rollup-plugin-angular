import fs from 'fs';
import path from 'path';

import MagicString from 'magic-string';
import { createFilter } from 'rollup-pluginutils';

const componentRegex = /@Component\(\s?{([\s\S]*)}\s?\)$/gm;
const templateUrlRegex = /templateUrl\s*:(.*)/g;
const styleUrlsRegex = /styleUrls\s*:(\s*\[[\s\S]*?\])/g;
const stringRegex = /(['"])((?:[^\\]\\\1|.)*?)\1/g;

function insertText(str, dir, preprocessor = res => res) {
  return str.replace(stringRegex, function (match, quote, url) {
    const includePath = path.join(dir, url);
    const text = fs.readFileSync(includePath).toString();
    return '`' + preprocessor(text, includePath) + '`';
  });
}

export default function angular(options = {}) {
  options.preprocessors = options.preprocessors || {};

  // ignore @angular/** modules
  options.exclude = options.exclude || [];
  if (typeof options.exclude === 'string' || options.exclude instanceof String) options.exclude = [options.exclude];
  if (options.exclude.indexOf('node_modules/@angular/**') === -1) options.exclude.push('node_modules/@angular/**');

  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'angular',
    transform(source, map) {
      if (!filter(map)) return;

      const magicString = new MagicString(source);
      const dir = path.parse(map).dir;

      let hasReplacements = false;
      let match;
      let start, end, replacement;

      while ((match = componentRegex.exec(source)) !== null) {
        start = match.index;
        end = start + match[0].length;

        replacement = match[0]
          .replace(templateUrlRegex, function (match, url) {
            hasReplacements = true;
            return 'template:' + insertText(url, dir, options.preprocessors.template);
          })
          .replace(styleUrlsRegex, function (match, urls) {
            hasReplacements = true;
            return 'styles:' + insertText(urls, dir, options.preprocessors.style);
          });

        if (hasReplacements) magicString.overwrite(start, end, replacement);
      }

      if (!hasReplacements) return null;

      let result = { code: magicString.toString() };
      if (options.sourceMap !== false) result.map = magicString.generateMap({ hires: true });

      return result;
    }
  };
}
