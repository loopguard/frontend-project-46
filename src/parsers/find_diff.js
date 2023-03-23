import _ from 'lodash';

const findDiff = (left, right) => {
  const keys = _.sortBy(_.union(_.keys(left), _.keys(right)));

  return keys.flatMap((key) => {
    if (!_.has(left, key)) {
      return { key, value: right[key], state: 'added' };
    }
    if (!_.has(right, key)) {
      return { key, value: left[key], state: 'removed' };
    }
    if (left[key] === right[key]) {
      return { key, value: left[key], state: 'unchanged' };
    }
    if (_.isObject(left[key]) && _.isObject(right[key])) {
      return { key, value: findDiff(left[key], right[key]), state: 'object' };
    }
    return { key, value: { oldValue: left[key], newValue: right[key] }, state: 'updated' };
  });
};

export default findDiff;
