import fs from 'fs';
import path from 'path';

import { createFilter } from 'rollup-pluginutils';

const componentRegex = /@(Component)\({([\s\S]*)}\)$/gm;
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

export default function angular (options = {}) {
  options.preprocessors = options.preprocessors || {};

  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'angular',
    transform(source, map) {
      if (!filter(map)) return;

      const dir = path.parse(map).dir;

      source = source.replace(componentRegex, function (match, decorator, metadata) {
        metadata = metadata
          .replace(templateUrlRegex, function (match, url) {
            return 'template:' + insertText(url, dir, options.preprocessors.template);
          })
          .replace(styleUrlsRegex, function (match, urls) {
            return 'styles:' + insertText(urls, dir, options.preprocessors.style);
          });

          return '@' + decorator + '({' + metadata + '})';
      });

      return {
        code: source,
        map: { mappings: '' }
      };
    }
  };
}
