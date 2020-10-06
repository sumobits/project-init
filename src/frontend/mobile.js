/**
 * @format
 */
import fs from 'fs-extra';
import path from 'path';
import {
    addDependency,
    createReactNativeProject,
} from '../utils';

const author = 'TJ Cook<sumobits@protonmail.com>';
const baseRepository = 'https://github.com/sumobits/';
const license = 'MIT';
const version = '0.0.1';
const scripts = {
    'android-clean': 'rm -rf $HOME/.gradle/caches & rm -rf ./android/.gradle/caches/ & rm -rf ./android/app/build',
    'android-dev': 'npx react-native run-android --variant=debug --verbose',
    'android-release': 'npx react-native run-android --variant=release --verbose',
    'ios': 'npx react-native run-ios',
    'start': 'npx react-native start',
    'test': 'jest',
    'lint': 'eslint .',
    'lint-fix': 'eslint . --fix',
    'cleanup': 'rm -rf node_modules && rm -f yarn.lock && yarn cache clean',
    'reinstall': 'rm -rf node_modules && rm -f yarn.lock && yarn cache clean && yarn install'
};
const baseDependencies = [
    '@react-native-community/masked-view',
    '@react-navigation/bottom-tabs',
    '@react-navigation/native',
    'apollo-boost',
    'apollo-cache-inmemory',
    'apollo-link-http',
    'graphql',
    'graphql-tag',
    'prop-types',
    'react',
    'react-native',
    'react-native-gesture-handler',
    'react-native-reanimated',
    'react-native-screens',
    'react-native-vector-icons',
    'react-navigation',
];
const firebaseDependencies = [
    '@react-native-firebase/app',
];

export const createFrontendMobileProject = async opts => {
    const {
        firebase,
        location,
        name,
        optional,
    } = opts;

    const dependencies = new Set();

    baseDependencies.forEach(entry => dependencies.add(entry));

    if (firebase) {
        firebaseDependencies.forEach(entry => dependencies.add(entry));
    }

    if (optional) {
        optionalDependencies.forEach(entry => dependencies.add(entry));
    }

    const packageJSON = {
        name,
        author,
        license,
        'repository': (baseRepository + name),
        version,
        scripts,
    };

    try {
        await fs.copy(path.join(__dirname, 'static'), location, { overwrite: true });
        await fs.writeJson(path.join(location, 'package.json'), packageJSON, { spaces: 4 });

        let depends = '';
        
        dependencies.forEach(entry => depends += `${entry} `);
        addDependency(location, depends, false);
        return 0;
    }
    catch (e) {
        console.log(`Error creating project: ${e.message}`);
        return -1;
    }
};
