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
        hint: '- Space to select. Return to submit',
        message: ('Is the project backend only, backend & mobile, backend & ' 
            +' web, frontend web only  or frontend mobile only ?'),
        max: 3,
        min: 1,
        name: 'stacks',
        type: 'multiselect',
    }, {
        message: 'Include optional dependencies for stack?',
        name: 'optional',
        type: 'toggle',
    }, {
        message: 'Include Firebase deependencies for stack?',
        name: 'firebase',
        type: 'toggle',
    }, {
        message: 'Include MongoDB dependecies for stack?',
        name: 'mongodb',
        type: (prev, values) => {
            if (!values.stack || values.stack.indexOf('front-') === -1) {
                return 'toggle';
            } 
            
            return null;
        },
    }, {
        message: 'Include Postgres dependencies for stack?',
        name: 'postgres',
        type: (prev, values) => {
            const { stacks } =  values;
            const filtedStacks = stacks.filter(stack => stack.indexOf('front-') >= 0 );

            if (!prev && filtedStacks.length === 0) {
                return 'toggle';
            } 
            
            return null;
        },
    },
];
