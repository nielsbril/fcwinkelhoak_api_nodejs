// Import the test.env environment file and override process.env
import { DotenvParseOutput, parse } from 'dotenv';
import { join } from 'path';
import { readFileSync } from 'fs';

const env: DotenvParseOutput = parse(readFileSync(join(__dirname, '../.env/test.env')));

Object.keys(env).forEach((key: string) => {
	process.env[key] = env[key];
});
