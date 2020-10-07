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
import {
    addDependency,
    createReactNativeProject,
} from '../../utils';

const scripts = {
    'android-clean': 'rm -rf $HOME/.gradle/caches & rm -rf ./android/.gradle/caches/ & rm -rf ./android/app/build',
    'android-dev': 'npx react-native run-android --variant=debug --verbose',
    'android-release': 'npx react-native run-android --variant=release --verbose',
    'ios': 'npx react-native run-ios',
    'start': 'npx react-native start',
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
    'react-native-gesture-handler',
    'react-native-reanimated',
    'react-native-screens',
    'react-native-vector-icons',
    'react-navigation',
];
const firebaseDependencies = [
    '@react-native-firebase/app',
];

/**
 *  Used to remove any character's the 
 *  react-native cli deems invalid for project names
 * @param {*} projectName 
 */
const sanitizeProjectName = projectName => {
    const dirty = projectName.search(/\W|_/g);

    if (dirty > -1) {
        const first = (projectName.charAt(0).toUpperCase()
            + projectName.slice(1, dirty));

        const second = (projectName.charAt(dirty + 1).toUpperCase()
            + projectName.slice(dirty + 2, projectName.length));

        return (first + second);
    }

    return (projectName.charAt(0).toUpperCase() + projectName.slice(1));
};

export const createFrontendMobileProject = async opts => {
    const {
        firebase,
        location,
        name,
    } = opts;

    const dependencies = new Set();

    baseDependencies.forEach(entry => dependencies.add(entry));

    if (firebase) {
        firebaseDependencies.forEach(entry => dependencies.add(entry));
    }

    try {
        await fs.ensureDir(location);

        const sanitizedName = sanitizeProjectName(name);
        
        await createReactNativeProject(sanitizedName, location);

        await fs.copy(path.join(__dirname, 'static'), 
            path.join(location, sanitizedName), { overwrite: true });

        const packageJson = await fs.readJSON(
            path.join(location, sanitizedName, 'package.json'));

        const output = path.join(location, sanitizedName, 'package.json');

        await fs.writeJson(path.join(location, sanitizedName,'package.json'), {
            name: sanitizedName,
            author,
            license,
            repository: (baseRepository + name),
            version,
            scripts: {
                ...scripts,
                ...baseScripts,
            },
            ...packageJson,
        }, { spaces: 4 });

        // we add each dependency independently 
        // allow for auto-linking to occur
        dependencies.forEach(entry => addDependency(
            path.join(location, sanitizedName), entry, false));
        return 0;
    }
    catch (e) {
        console.log(`Error creating project: ${ e.message }`);
        return -1;
    }
};
