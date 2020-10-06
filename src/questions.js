/**
 * @format
 */

export const options = [ {
        message: 'What is the project\'s name?',
        name: 'name',
        type: 'text',
        validate: value => (!value || value.length === 0) ? 'Prject Name is required. Please try again.' : true,
    }, {
        format: (val, values) => (!val || val.length === 0) ? `../${values.name}` : val,
        message: 'Path where to create the project?',
        name: 'location',
        type: 'text',
    }, {
        choices: [
            { title: 'Backend', value: 'back' },
            { title: 'Frontend Web', value: 'front-web' },
            { title: 'Frontend Mobile', value: 'front-mobile' },
        ],
        intial: 1,
        message: ('Is the project backend only, backend & mobile, backend & ' 
            +' web, frontend web only  or frontend mobile only ?'),
        max: 2,
        name: 'stack',
        type: 'multiselect',
    }, {
        initial: false,
        message: 'Include optional dependencies for stack?',
        name: 'optional',
        type: 'toggle',
    }, {
        initial: false,
        message: 'Include Firebase deependencies for stack?',
        name: 'firebase',
        type: 'toggle',
    }, {
        initial: false,
        message: 'Include MongoDB dependecies for stack?',
        name: 'mongodb',
        type: (prev, values) => {
            if (!values.stack || values.stack.indexOf('front-') === -1) {
                return 'toggle';
            } 
            
            return null;
        },
    }, {
        inital: false,
        message: 'Include Postgres dependencies for stack?',
        name: 'postgres',
        type: (prev, values) => {
            if (!prev && !values.stack || values.stack.indexOf('front-') === -1) {
                return 'toggle';
            } 
            
            return null;
        },
    },
];
