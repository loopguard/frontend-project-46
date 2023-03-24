import formatPlain from './plain.js';
import formatJson from './json.js';
import formatPretty from './pretty.js';

const formatters = {
  plain: formatPlain,
  json: formatJson,
  pretty: formatPretty,
};

export default (diff, formatName) => formatters[formatName](diff);
