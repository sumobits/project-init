import { options } from '../src/questions';

test ('question generalization', () => {
    expect(options).toBeDefined();
    expect(Array.isArray(options)).toBeTruthy();
    expect(options).toHaveLength(7);
});

describe('name question', () => {
    const projectName = options[0];

    test('name to be "name"', () => {
        expect(projectName.name).toBe('name');
    });

    test('message to be defined', () => {
        expect(projectName.message).toBeDefined();
    });

    test('type to be "text"', () => {
        expect(projectName.type).toBe('text');
    });
});

describe('path question', () => {
    const projectPath = options[1];

    test('name to be "location"', () => {
        expect(projectPath.name).toBe('location');
    });

    test('message to be defined', () => {
        expect(projectPath.message).toBeDefined();
    });
    
    test('type to be "text"', () => {
        expect(projectPath.type).toBe('text');
    });
});

describe('stacks question', () => {
    const projectStack = options[2];

    test('name to be "stacks"', () => {
        expect(projectStack.name).toBe('stacks');
    });

    test('message to be defined', () => {
        expect(projectStack.message).toBeDefined();
    });

    test('hint to be defined', () => {
        expect(projectStack.hint).toBeDefined();
    });

    test('type to be "multiselect"', () => {
        expect(projectStack.type).toBe('multiselect');
    });

    test('choices are valid', () => {
        const viableChoices = [
            { title: 'Backend', value: 'back' },
            { title: 'Mobile', value: 'mobile' },
            { title: 'Web', value: 'web' },
        ];

        expect(projectStack.choices).toEqual(viableChoices);
    });

    test('choices are invalid', () => {
        const nonviableChoices = [
            { title: 'Cobol', value: 'cobol' },
            { title: 'Ruby', value: 'ruby' },
        ];

        expect(projectStack.choices).not.toContain(nonviableChoices);
    });
});
