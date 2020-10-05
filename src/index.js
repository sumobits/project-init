/**
 * @format
 */
import prompts from 'prompts';
import { createBackendProject } from './backend';

const options = [
        {
            message: 'What is the project\'s name?',
            name: 'name',
            type: 'text',
            validate: value => (!value || value.length === 0) ? 'Prject Name is required. Please try again.' : true,
        },
        {
            format: (val, values) => (!val || val.length === 0) ? `../${values.name}` : val,
            message: 'Path where to create the project?',
            name: 'location',
            type: 'text',
        },
        {
            choices: [
                { title: 'Backend', value: 'back' },
                { title: 'Frontend', value: 'front' },
                { title: 'Both', value: 'both' }
            ],
            intial: 1,
            message: 'Is the project frontend, backend or both?',
            name: 'stack',
            type: 'select',
        },
        {
            initial: false,
            message: 'Include optional dependencies for stack?',
            name: 'optional',
            type: 'toggle',
        },
        {
            initial: false,
            message: 'Include Firebase deependencies for stack?',
            name: 'firebase',
            type: 'toggle',
        },
        {
            initial: false,
            message: 'Include MongoDB dependecies for stack?',
            name: 'mongodb',
            type: 'toggle',
        },
        {
            inital: false,
            message: 'Include Postgres dependencies for stack?',
            name: 'postgres',
            type: 'toggle',
        }, 
];

(async () => {
    const results = await prompts(options);
    const { stack } = results;

    if (stack === 'back') {
        await createBackendProject(results);
    } else if (stack === 'front') {
        // create client and server modules
    } else {
        // lets create both as a mono-project
    }
})();
