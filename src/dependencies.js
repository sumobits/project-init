/**
 * @format
 */

 /**
  * common package.json properties. 
  * Used for all stacks.
  */
export const common = {
    author: 'TJ Cook<sumobits@protonmail.com>',
    baseRepository: 'https://github.com/sumobits/',
    baseScripts: {
        'clean': 'rm -rf node_modules && rm yarn.lock && yarn cache clean',
        'lint': 'eslint.',
        'lint-fix': 'eslint . --fix',
        'reinstall': 'rm -rf node_modules && rm yarn.lock && yarn cache clean && yarn install',
        'test': 'jest'
    },
    license: 'MIT',
    version: '0.0.1',
};

/**
 * dependencies currently in use by Sumobits
 * for all backend service applications.
 */
export const backend = {
    base: [
        'dotenv',
        'express',
        'lodash',
        'winston',
    ],
     dev: [
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
    ],
    firebase: [
        'firebase',
    ],
    monogdb: [
        'apollo-datasource',
        'graphql',
        'graphql-iso-date',
        'mongodb'
    ],
    optional: [
        'fs-extra',
        'moment',
        'uuidv4',
    ],
    postgres: [
        'pg',
        'sequelize',
    ],
    scripts: {
        'start': 'gulp && node ./dist/index.js',
        'start-debug': 'gulp package-debug && node ./dist/index.js --inspect',
    },
};

export const frontend = {
    common: {
        optional: [
            'lodash',
            'moment',
        ],
    },
    mobile: {
        base: [
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
        ],
        firebase: [
            '@react-native-firebase/app',
        ],
        scripts: {
            'android-clean': ('rm -rf $HOME/.gradle/caches &&'  
                + ' rm -rf ./android/.gradle/caches/ && rm -rf ./android/app/build'),
            'android-dev': 'npx react-native run-android --variant=debug --verbose',
            'android-release': 'npx react-native run-android --variant=release --verbose',
            'ios': 'npx react-native run-ios',
            'start': 'npx react-native start',
        },
    },
    web: {
        base: [
            'apollo-boost',
            'apollo-cache-inmemory',
            'apollo-link-http',
            'graphql',
            'graphql-tag',
            'prop-types',
            'react-router-dom',
        ],
        firebase: [
            'firebase',
        ],
        optional: [
            '@material-ui/core',
            'google-map-react',
        ]
    },
};
