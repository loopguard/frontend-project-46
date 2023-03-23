import yaml from 'js-yaml';

export default (data, format) => {
  const parsers = { yml: yaml.load, yaml: yaml.load, json: JSON.parse };
  return parsers[format](data);
};
