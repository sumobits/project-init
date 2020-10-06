/**
 * @format
 */
import prompts from 'prompts';
import { createBackendProject } from './backend';
import { createFrontendMobileProject } from './frontend';
import { verifyEnvironment } from './utils';
import { options } from './questions';

(async () => {
    let ready = false;

    while (!ready) {
        ready = await verifyEnvironment();
    }

    const opts = await prompts(options);
    const { stack } = opts;

    if (stack === 'back') {
        await createBackendProject(opts);
    } else if (stack === 'front-mobile') {
        await createFrontendMobileProject(opts);
    } else if (stack === 'front-web') {
    }
})();
