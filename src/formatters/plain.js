import _ from 'lodash';

const wrapObject = (obj) => {
  if (_.isObject(obj)) {
    return '[complex value]';
  }
  if (_.isString(obj)) {
    return `'${obj}'`;
  }
  return obj;
};

const formatPlain = (diff, path = []) => diff
  .filter((item) => item.state !== 'unchanged')
  .map((item) => {
    const newPath = path.concat(item.key);
    const propKey = newPath.join('.');

    switch (item.state) {
      case 'removed':
        return `Property '${propKey}' was removed`;
      case 'added': {
        const propVal = wrapObject(item.value);
        return `Property '${propKey}' was added with value: ${propVal}`;
      }
      case 'updated': {
        const oldPropVal = wrapObject(item.value.oldValue);
        const newPropVal = wrapObject(item.value.newValue);
        return `Property '${propKey}' was updated. From ${oldPropVal} to ${newPropVal}`;
      }
      default:
        return formatPlain(item.value, newPath);
    }
  }).join('\n');

export default formatPlain;
