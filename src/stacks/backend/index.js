/**
 * @format
 */
import fs from 'fs-extra';
import path from 'path';
import {
    author,
    baseRepository,
    baseScripts,
    license,
    version,
} from '../common';
import { addDependency } from '../../utils';

const baseDependencies = [
    'dotenv',
    'express',
    'lodash',
    'winston',
];
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
};

export const createBackendProject = async opts => {
    const {
        firebase,
        location,
        mongodb,
        name,
        optional,
        postgres,
    } = opts;

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
        name,
        author,
        license,
        'repository': (baseRepository + name),
        version,
        scripts: {
            ...baseScripts,
            ...scripts,
        },
    };

    try {
        await fs.copy(path.join(__dirname, 'static'), location, { overwrite: true });
        await fs.writeJson(path.join(location, 'package.json'), packageJSON, { spaces: 4 });
        await fs.ensureFile(path.join(location, 'src', 'index.js'));

        let devDepends = '', depends = '';

        devDependencies.forEach(entry => devDepends += `${entry} `);
        dependencies.forEach(entry => depends += `${entry} `);
        addDependency(location, devDepends, true);
        addDependency(location, depends, false);

        return 0;
    }
    catch (e) {
        console.log(`Error creating project: ${e.message}`);
        return -1;
    }
};

