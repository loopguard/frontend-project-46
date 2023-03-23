const indentLine = () => '      ';
const indentBracket = () => ' ';
const formatLine = (key, value, char) => `${indentLine()}${char}${key}: ${value}`;
const wrapBrackets = (body) => `{\n${body}\n${indentBracket()}}`;

export default (diff) => {
  const items = diff.flatMap(({ key, value, state }) => {
    const chars = { added: '+ ', removed: '- ', unchanged: '  ' };
    if (state === 'updated') {
      return [formatLine(key, value.oldValue, chars.removed),
        formatLine(key, value.newValue, chars.added)];
    }
    return formatLine(key, value, chars[state]);
  });
  const body = items.join('\n');

  return wrapBrackets(body);
};
