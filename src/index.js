import { readFileSync } from 'fs';
import path from 'path';
import findDiff from './find_diff.js';
import parseData from './parse_data.js';
import formatDiff from './format_diff.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);
const getFileFormat = (filename) => path.extname(filename).slice(1);
const readFile = (filepath) => readFileSync(filepath, 'utf8');

export default (filepath1, filepath2) => formatDiff(findDiff(
  parseData(readFile(getPath(filepath1)), getFileFormat(filepath1)),
  parseData(readFile(getPath(filepath2)), getFileFormat(filepath2)),
));
