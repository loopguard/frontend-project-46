import _ from 'lodash';

const findDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  return keys.flatMap((key) => {
    if (!_.has(data1, key)) {
      return { key, value: data2[key], state: 'added' };
    }
    if (!_.has(data2, key)) {
      return { key, value: data1[key], state: 'removed' };
    }
    if (data1[key] === data2[key]) {
      return { key, value: data1[key], state: 'unchanged' };
    }
    return { key, value: { oldValue: data1[key], newValue: data2[key] }, state: 'updated' };
  });
};

export default findDiff;
