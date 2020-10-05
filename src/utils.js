/**
 * @format
 */
import { execSync } from 'child_process';

 const addDepenedency = (cwd, dependency) => {
    execSync(`yarn add ${dependency}`, {
        cwd,
        stdio: 'inherit',
    });
 };

 const addDevDependency = (cwd, dependency) => {
     execSync(`yarn add --dev ${dependency}`, {
         cwd,
         stdio: 'inherit',
     });
 };

 export { 
     addDepenedency,
     addDevDependency,
};
