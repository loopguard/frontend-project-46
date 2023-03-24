import formatJson from './json.js';
import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const formatters = {
  json: formatJson,
  plain: formatPlain,
  stylish: formatStylish,
};

export default (diff, formatName) => formatters[formatName](diff);
