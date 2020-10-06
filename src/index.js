/**
 * @format
 */
import prompts from 'prompts';
import { 
    createBackendProject,
    createFrontendMobileProject,
    createFrontendWebProject,
} from './stacks';
import { verifyEnvironment } from './utils';
import { options } from './questions';

(async () => {
    let ready = false;

    while (!ready) {
        ready = await verifyEnvironment();
    }

    const opts = await prompts(options);
    const { stacks } = opts;

    stacks.forEach(async stack => {
        if (stack === 'back') {
            await createBackendProject(opts);
        } 
        else if (stack === 'front-mobile') {
            await createFrontendMobileProject(opts);
        } 
        else if (stack === 'front-web') {
            createFrontendWebProject(opts);
        }
    });
})();
