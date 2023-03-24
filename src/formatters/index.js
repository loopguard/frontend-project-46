import formatDefault from './default.js';
import formatPlain from './plain.js';

const formatters = {
  plain: formatPlain,
  default: formatDefault,
};

export default (diff, formatName) => formatters[formatName](diff);
