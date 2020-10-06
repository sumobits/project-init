/**
 * @format
 */
export const author = 'TJ Cook<sumobits@protonmail.com>';
export const baseRepository = 'https://github.com/sumobits/';
export const baseScripts = {
    'clean': 'rm -rf node_modules && rm yarn.lock && yarn cache clean',
    'lint': 'eslint.',
    'lint-fix': 'eslint . --fix',
    'reinstall': 'rm -rf node_modules && rm yarn.lock && yarn cache clean && yarn install',
    'test': 'jest'
};
export const license = 'MIT';
export const version = '0.0.1';
