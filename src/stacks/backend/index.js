/**
 * @format
 */
import fs from 'fs-extra';
import path from 'path';
import { 
    backend,
    common,
} from '../dependencies';
import { addDependency } from '../../utils';

export const createBackendProject = opts => {
    const {
        firebase,
        location,
        mongodb,
        name,
        optional,
        postgres,
    } = opts;
    const {
        base: baseDepends,
        dev: devDepends,
        firebase: firebaseDepends,
        monogdb: monogdbDepends,
        optional: optionalDepends,
        postgres: postgresDepends,
        scripts,
    } = backend;
    const {
        author,
        baseRepository,
        baseScripts,
        license,
        version
    } = common;

    const dependencies = new Set();

    baseDepends.forEach(entry => dependencies.add(entry));

    if (firebase) {
        firebaseDepends.forEach(entry => dependencies.add(entry));
    }

    if (mongodb) {
        monogdbDepends.forEach(entry => dependencies.add(entry));
    }

    if (optional) {
        optionalDepends.forEach(entry => dependencies.add(entry));
    }

    if (postgres) {
        postgresDepends.forEach(entry => dependencies.add(entry));
    }

    const packageJSON = {
        name,
        author,
        license,
        repository: (baseRepository + name),
        version: version,
        scripts: {
            ...scripts,
            ...baseScripts,
        },
    };

    try {        
        const resolvedLocation = path.join(path.resolve(location), 'backend');
        
        fs.ensureDirSync(resolvedLocation);
        fs.copySync(path.join(__dirname, 'static'), resolvedLocation, { overwrite: true });
        fs.writeJsonSync(path.join(resolvedLocation, 'package.json'), packageJSON, { spaces: 4 });
        fs.ensureFileSync(path.join(resolvedLocation, 'src', 'index.js'));
        devDepends.forEach(entry => addDependency(resolvedLocation, entry, true));
        dependencies.forEach(entry => addDependency(resolvedLocation, entry, false));
        return 0;
    }
    catch (e) {
        console.log(`Error creating project: ${e.message}`);
        return -1;
    }
};

