/**
 * @format
 */
import { 
    exec,
    execSync 
} from 'child_process';

const addDependency = (cwd, dependency, isDev) => {
    if (!dependency) return;

    execSync(`yarn add ${dependency} ${isDev ? '--dev' : null}`, {
        cwd,
        stdio: 'inherit',
    });
};

const createReactNativeProject = (projectName, location) => {
    if (!projectName || !location) return;

    execSync(`npx react-native init ${projectName}`, {
        location,
        stdio: 'inherit',
    });
};

const verifyEnvironment = async () => {
    console.info('------------------------------------------------');
    console.info('    Verifying environment ....');
    let verified = false;

    while (!verified) {
        if (await verifyYarn()) {
            if (await verifyNPX()) {
                console.info('    Environment has been verified.');
                verified = true;
            }
            else {
                console.warn('        Installing NPX globally ....');
                await installNPX();
            }
        }
        else {
            console.warn('        Installing Yarn globally ....');
            await installYarn();
        }
    }
    console.info('------------------------------------------------');
    return verified;
};

/**
 * NOTES
 * non-exported functions below. for internal use only.
 */
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

    return new Promise((resolve, reject) => {
        exec(`which ${app}`, (err) => {
            if (err) {
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

export { 
    addDependency,
    createReactNativeProject,
    verifyEnvironment,
};
