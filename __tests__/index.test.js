import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedOutStylish = '{\n'
  + '    common: {\n'
  + '      + follow: false\n'
  + '        setting1: Value 1\n'
  + '      - setting2: 200\n'
  + '      - setting3: true\n'
  + '      + setting3: null\n'
  + '      + setting4: blah blah\n'
  + '      + setting5: {\n'
  + '            key5: value5\n'
  + '        }\n'
  + '        setting6: {\n'
  + '            doge: {\n'
  + '              - wow: \n'
  + '              + wow: so much\n'
  + '            }\n'
  + '            key: value\n'
  + '          + ops: vops\n'
  + '        }\n'
  + '    }\n'
  + '    group1: {\n'
  + '      - baz: bas\n'
  + '      + baz: bars\n'
  + '        foo: bar\n'
  + '      - nest: {\n'
  + '            key: value\n'
  + '        }\n'
  + '      + nest: str\n'
  + '    }\n'
  + '  - group2: {\n'
  + '        abc: 12345\n'
  + '        deep: {\n'
  + '            id: 45\n'
  + '        }\n'
  + '    }\n'
  + '  + group3: {\n'
  + '        deep: {\n'
  + '            id: {\n'
  + '                number: 45\n'
  + '            }\n'
  + '        }\n'
  + '        fee: 100500\n'
  + '    }\n'
  + '}';

const expectedOutPlain = 'Property \'common.follow\' was added with value: false\n'
  + 'Property \'common.setting2\' was removed\n'
  + 'Property \'common.setting3\' was updated. From true to null\n'
  + 'Property \'common.setting4\' was added with value: \'blah blah\'\n'
  + 'Property \'common.setting5\' was added with value: [complex value]\n'
  + 'Property \'common.setting6.doge.wow\' was updated. From \'\' to \'so much\'\n'
  + 'Property \'common.setting6.ops\' was added with value: \'vops\'\n'
  + 'Property \'group1.baz\' was updated. From \'bas\' to \'bars\'\n'
  + 'Property \'group1.nest\' was updated. From [complex value] to \'str\'\n'
  + 'Property \'group2\' was removed\n'
  + 'Property \'group3\' was added with value: [complex value]';

const expectedOutJson = '[{"key":"common","value":[{"key":"follow","value":false,"state":"added"},{"key":"setting1","value":"Value 1","state":"unchanged"},{"key":"setting2","value":200,"state":"removed"},{"key":"setting3","value":{"oldValue":true,"newValue":null},"state":"changed"},{"key":"setting4","value":"blah blah","state":"added"},{"key":"setting5","value":{"key5":"value5"},"state":"added"},{"key":"setting6","value":[{"key":"doge","value":[{"key":"wow","value":{"oldValue":"","newValue":"so much"},"state":"changed"}],"state":"object"},{"key":"key","value":"value","state":"unchanged"},{"key":"ops","value":"vops","state":"added"}],"state":"object"}],"state":"object"},{"key":"group1","value":[{"key":"baz","value":{"oldValue":"bas","newValue":"bars"},"state":"changed"},{"key":"foo","value":"bar","state":"unchanged"},{"key":"nest","value":{"oldValue":{"key":"value"},"newValue":"str"},"state":"changed"}],"state":"object"},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"state":"removed"},{"key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500},"state":"added"}]';

test('pretty_diff_json_success', () => {
  const filename1 = getFixturePath('file1.json');
  const filename2 = getFixturePath('file2.json');

  expect(genDiff(filename1, filename2, 'stylish')).toBe(expectedOutStylish);
});

test('pretty_diff_yml_success', () => {
  const filename1 = getFixturePath('file1.yml');
  const filename2 = getFixturePath('file2.yml');

  expect(genDiff(filename1, filename2, 'stylish')).toBe(expectedOutStylish);
});

test('plain_diff_json_success', () => {
  const filename1 = getFixturePath('file1.json');
  const filename2 = getFixturePath('file2.json');

  expect(genDiff(filename1, filename2, 'plain')).toBe(expectedOutPlain);
});

test('plain_diff_yml_success', () => {
  const filename1 = getFixturePath('file1.yml');
  const filename2 = getFixturePath('file2.yml');

  expect(genDiff(filename1, filename2, 'plain')).toBe(expectedOutPlain);
});

test('json_diff_json_success', () => {
  const filename1 = getFixturePath('file1.json');
  const filename2 = getFixturePath('file2.json');

  expect(genDiff(filename1, filename2, 'json')).toBe(expectedOutJson);
});

test('json_diff_yml_success', () => {
  const filename1 = getFixturePath('file1.yml');
  const filename2 = getFixturePath('file2.yml');

  expect(genDiff(filename1, filename2, 'json')).toBe(expectedOutJson);
});

test('default_diff_json_success', () => {
  const filename1 = getFixturePath('file1.json');
  const filename2 = getFixturePath('file2.json');

  expect(genDiff(filename1, filename2)).toBe(expectedOutStylish);
});

test('default_diff_yml_success', () => {
  const filename1 = getFixturePath('file1.yml');
  const filename2 = getFixturePath('file2.yml');

  expect(genDiff(filename1, filename2)).toBe(expectedOutStylish);
});
