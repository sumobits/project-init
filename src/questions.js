/**
 * @format
 */

 const filterStack = (stacks, selectedStack) => {
     const filteredStacks = stacks.filter(stack => stack === selectedStack);

     if (filteredStacks.length > 0) {
         return true;
     }

     return false;
 };

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
            { title: 'Mobile', value: 'mobile' },
            { title: 'Web', value: 'web' },
        ],
        hint: '- Space to select. Return to submit',
        message: 'Select all options which apply',
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
            if(filterStack(values.stacks, 'back')) {
                return 'toggle';
            }

            return null;
        },
    }, {
        message: 'Include Postgres dependencies for stack?',
        name: 'postgres',
        type: (prev, values) => { 
            if (!prev && filterStack(values.stacks, 'back')) {
                return 'toggle';
            } 
            
            return null;
        },
    }, {
        message: 'Include Apollo dependencies for stack?',
        name: 'apollo',
        type: (prev, values) => {
            if (filterStack(values.stacks, 'web')) {
                return 'toggle';
            }

            return null;
        },
    },
];
