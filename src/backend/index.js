/**
 * @format
 */
import fs from 'fs-extra';
import path from 'path';
import {
    addDepenedency,
    addDevDependency,
} from '../utils';

const author = 'TJ Cook<sumobits@protonmail.com>';
const baseDependencies = [
    'dotenv',
    'express',
    'lodash',
    'winston',
];
const baseRepository = 'https://github.com/sumobits/';
const devDependencies = [
    '@babel/cli',
    '@babel/core',
    '@babel/preset-env',
    '@babel/register',
    'babel-eslint',
    'del',
    'eslint',
    'eslint-plugin-import',
    'gulp',
    'gulp-babel',
    'gulp-eslint',
    'gulp-sourcemaps',
    'gulp-uglify',
    'jest',
];
const firebaseDependencies = [
    'firebase',
];
const license = 'MIT';
const monogdbDependencies = [
    'apollo-datasource',
    'graphql',
    'graphql-iso-date',
    'mongodb'
];
const optionalDependencies = [
    'fs-extra',
    'moment',
    'uuidv4',
];
const postgresDependencies = [
    'pg',
    'sequelize',
];
const scripts = {
    'start': 'gulp && node ./dist/index.js',
    'start-debug': 'gulp package-debug && node ./dist/index.js --inspect',
    'lint': 'eslint .',
    'lint-fix': 'eslint . --fix',
    'test': 'jest',
    'clean': 'rm -rf node_modules && rm yarn.lock && yarn cache clean',
    'reinstall': 'rm -rf node_modules && rm yarn.lock && yarn cache clean && yarn install'
};
const version = '0.0.1';

export const createBackendProject = async opts => {
    const {
        firebase,
        location,
        mongodb,
        optional,
        postgres,
        project,
    } = opts;

    if (!project) {
        throw new Error(
            'project name is required in order to generate backend project');
    }

    const dependencies = new Set();

    baseDependencies.forEach(entry => dependencies.add(entry));

    if (firebase) {
        firebaseDependencies.forEach(entry => dependencies.add(entry));
    }

    if (mongodb) {
        monogdbDependencies.forEach(entry => dependencies.add(entry));
    }

    if (optional) {
        optionalDependencies.forEach(entry => dependencies.add(entry));
    }

    if (postgres) {
        postgresDependencies.forEach(entry => dependencies.add(entry));
    }

    const packageJSON = {
        name: project,
        author: author,
        license: license,
        'repository': (baseRepository + project),
        version: version,
        scripts: scripts,
    };

    try {
        console.log(path.join(__dirname, 'static'));
        await fs.copy(path.join(__dirname, 'static'), location, { overwrite: true });
        await fs.writeJson(path.join(location, 'package.json'), packageJSON, { spaces: 4 });

        let devDepends = '', depends = '';

        devDependencies.forEach(entry => devDepends += `${entry} `);
        dependencies.forEach(entry => depends += `${entry} `);
        addDevDependency(location, devDepends);
        addDepenedency(location, depends);
        return 0;
    }
    catch (e) {
        console.log(`Error creating project: ${e.message}`);
        return -1;
    }
};

