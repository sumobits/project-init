/**
 * @format
 */
import { execSync } from 'child_process';

export const addDependency = (cwd, dependency, isDev) => {
    if (!dependency) return;

    execSync(`yarn add ${dependency} ${isDev ? '--dev' : null}`, { cwd });
};

export const verifyEnvironment = () => {
    console.info('------------------------------------------------');
    console.info('    Verifying environment ....');
    let verified = false;

    while (!verified) {
        if (verifyYarn()) {
            if (verifyNPX()) {
                console.info('    Environment has been verified.');
                verified = true;
            }
            else {
                console.warn('        Installing NPX globally ....');
                installNPX();
            }
        }
        else {
            console.warn('        Installing Yarn globally ....');
            installYarn();
        }
    }
    console.info('------------------------------------------------');
    return verified;
};

/**
 * NOTES
 * non-exported functions below. for internal use only.
 */
const isWindows = process.platform === 'win32';

const installApp = async (cmd) => {
    if (!cmd) {
        throw new Error('improper usage of internal function: installApp');
    }

    return new Promise((resolve, reject) => {
        exec(cmd, (err) => {
            if (err) {
                reject (false);
            }

            resolve(true);
        });
    });
};

const installNPX = async () => {
    return await installApp('yarn install --global npx');
};

const installYarn = async () => {
    return await installApp('npm --global install yarn');
};

const verifyApp = app => {
    if (!app) {
        throw new Error('improper usage of internal function: verifyApp');
    }

    const cmd = `${isWindows ? 'where' : 'which'} ${app}`;

    return new Promise((resolve, reject) => {
        execSync(cmd, (err) => {
            if (err) {
                console.log(`failed to verify app: ${app} - ${err.message}`);
                reject(false);
            }

            resolve(true);
        });
    });
};

const verifyNPX = async () => {
    console.info('                Verifying NPX globally ....');
    return await verifyApp('npx');
};

const verifyYarn = async () => {
    console.info('                Verifying Yarn globally ....');
    return await verifyApp('yarn');
};
