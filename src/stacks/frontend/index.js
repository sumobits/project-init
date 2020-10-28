/**
 * @format
 */
import { execSync } from 'child_process';
import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import {
    common,
    frontend,
} from '../dependencies';
import { addDependency } from '../../utils';

/**
 *  Used to remove any character's the 
 *  react-native cli deems invalid for project names
 * @param {*} projectName 
 */
const sanitizeProjectName = (isMobile, projectName) => {
    if (isMobile) {
        const dirty = projectName.search(/\W|_/g);

        if (dirty > -1) {
            const first = (projectName.charAt(0).toUpperCase()
                + projectName.slice(1, dirty));

            const second = (projectName.charAt(dirty + 1).toUpperCase()
                + projectName.slice(dirty + 2, projectName.length));

            return (first + second);
        }

        return (projectName.charAt(0).toUpperCase() + projectName.slice(1));
    }
    else {
        return `${projectName}-web`;
    }
};

export const createFrontendProject = (opts, isMobile) => {
    const {
        apollo,
        firebase,
        location,
        name,
        optional,
    } = opts;
    const {
        author,
        baseRepository,
        baseScripts,
        license,
        version,
    } = common;
    const {
        common: { optional: commonDepends },
        mobile: {
            base: mobileBaseDepends,
            firebase: mobileFirebaseDepends,
            scripts: mobileScripts,
        },
        web: {
            apollo: webApolloDepends,
            base: webBaseDepends,
            firebase: webFirebaseDedends,
            optional: webOptionalDepends,
            scripts: webScripts,
        },
    } = frontend;

    const apolloDepends = isMobile ? undefined : webApolloDepends;
    const baseDepends = isMobile ? mobileBaseDepends : webBaseDepends;
    const firebaseDepends = isMobile ? mobileFirebaseDepends : webFirebaseDedends;
    const optDepends = isMobile ? undefined : webOptionalDepends;
    const scripts = isMobile ? mobileScripts : webScripts;
    const dependencies = new Set();

    commonDepends.forEach(entry => dependencies.add(entry));
    baseDepends.forEach(entry => dependencies.add(entry));

    if (apollo && apolloDepends) {
        webApolloDepends.forEach(entry => dependencies.add(entry));
    }

    if (firebase) {
        firebaseDepends.forEach(entry => dependencies.add(entry));
    }

    if (optional && optDepends) {
        optDepends.forEach(entry => dependencies.add(entry));
    }

    try {
        const resolvedLocation = path.join(path.resolve(location), name, 'frontend');
        const sanitizedName = sanitizeProjectName(isMobile, name);
        const command = isMobile ? 'react-native init' : 'create-react-app';

        console.info('----------------------------------------------');
        console.info(`    Creating React ${isMobile ? 'native' : 'web'} app ....`);
        console.info('----------------------------------------------');

        fs.ensureDirSync(resolvedLocation);

        const output = execSync(`npx ${command} ${sanitizedName}`, { cwd: resolvedLocation });
        
        console.info(output);
        
        fs.copySync(path.join(__dirname, 'static'),
            path.join(resolvedLocation, sanitizedName), { overwrite: true });

        const packageJson = fs.readJsonSync(
            path.join(resolvedLocation, sanitizedName, 'package.json'));

        fs.writeJsonSync(path.join(resolvedLocation, sanitizedName, 'package.json'), {
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
            path.join(resolvedLocation, sanitizedName), entry, false));

        if (isMobile) {
            const mobileFiles = glob.sync(
                path.join(resolvedLocation, sanitizedName), '**/**/*');
            mobileFiles.forEach(mobileFile => fs.moveSync(mobileFile, 
                path.join(resolvedLocation, `${name}-mobile`)));
        }
        return 0;
    }
    catch (e) {
        console.log(`Error creating project: ${e.message}`);
        return -1;
    }
};
