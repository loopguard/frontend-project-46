import _ from 'lodash';

const indentLine = (depth) => `  ${' '.repeat(4).repeat(depth - 1)}`;
const indentBracket = (depth) => `${' '.repeat(4).repeat(depth)}`;

const wrapLine = (key, value, char, depth) => `${indentLine(depth)}${char}${key}: ${value}`;
const wrapBrackets = (body, depth) => `{\n${body}\n${indentBracket(depth)}}`;

const wrapObject = (obj, depth) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const items = Object.entries(obj)
    .map(([key, value]) => wrapLine(key, wrapObject(value, depth + 1), '  ', depth + 1));

  return wrapBrackets(items.join('\n'), depth);
};

const formatStylish = (diff, depth = 0) => wrapBrackets(diff.flatMap(({ key, value, state }) => {
  const chars = { added: '+ ', removed: '- ', unchanged: '  ' };
  if (state === 'changed') {
    return [
      wrapLine(key, wrapObject(value.oldValue, depth + 1), chars.removed, depth + 1),
      wrapLine(key, wrapObject(value.newValue, depth + 1), chars.added, depth + 1),
    ];
  }
  if (state === 'object') {
    return wrapLine(key, formatStylish(value, depth + 1), '  ', depth + 1);
  }
  return wrapLine(key, wrapObject(value, depth + 1), chars[state], depth + 1);
}).join('\n'), depth);

export default formatStylish;
