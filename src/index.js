/**
 * @format
 */
import prompts from 'prompts';
import { 
    createBackendProject,
    createFrontendProject,
} from './stacks';
import { verifyEnvironment } from './utils';
import { options } from './questions';

process.on('uncaughtException', err => {
    console.error(err);
    console.log('Node NOT Exiting...');
});

(async () => {
    let ready = false;

    while (!ready) {
        ready = await verifyEnvironment();
    }

    const opts = await prompts(options);
    const { 
        location,
        name,
        stacks,
    } = opts;

    if (stacks && stacks.length > 0) {
        let result = -2;
        stacks.forEach(stack => {
            try {
                if (stack === 'back') {
                    result = createBackendProject(opts);
                }
                else if (stack === 'mobile' || stack === 'web') {
                    result = createFrontendProject(opts, stack === 'mobile');
                }
                else if (stack === 'middle') {
                    // TODO implement me.
                    console.warn('Middleware application generation is not currently implemented');
                    result = 0;
                }
            }
            catch (e) {
                console.error(`Failed to create project ${name} @ ${location}: ${e.message}`);
                console.trace();
                process.exit(-1);
            }
        });

        if (result === 0) {
            console.info('Successfully generated project(s)');
            process.exit(0);
        }

        console.error('Failed to generate project(s) please check console for errors');
        process.exit(result);
    }
    else {
        console.warn('No stacks specified. Bye');
        process.exit(1);
    }
})();
