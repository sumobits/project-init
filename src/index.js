/**
 * @format
 */
import prompt from 'prompt';
import { createBackendProject } from './backend';

const options = {
    properties: {
        project: {
            description: 'Project name',
            required: true,
            type: 'string',
        },
        location: {
            default: '..',
            description: 'Path where to create the project',
            required: true,
            type: 'string',
        },
        stack: {
            default: 'back',
            description: 'Is the project front, back or both',
            pattern: /(?:^|\W)back|both|front(?:$|\W)/g,
            required: true,
            type: 'string',
        },
        optional: {
            default: false,
            description: 'Include optional dependencies',
            type: 'boolean',
        },
        firebase: {
            default: false,
            description: 'Use Firebase',
            type: 'boolean',
        },
        mongodb: {
            default: false,
            description: 'Use MongoDB persistence',
            type: 'boolean',
        },
        postgres: {
            default: false,
            description: 'Use Postgres for persistence',
            default: false,
            type: 'boolean',
        },  
    },
};

prompt.start();

prompt.get(options, async (err, result) => {
    if (err) {
        throw err;
    }

    const { stack } = result;

    if (stack === 'back') {
        await createBackendProject(result);
    } else if (stack === 'both') {
        // create client and server modules
    } else {
        // must be front only
    }
});
