'use strict';

module.exports = function (api) {
    api.cache(false);

    const env = {
        debug: {
            retainLines: true,
            sourceMap: 'inline',
        }
    };

    const presets = [ [
        '@babel/preset-env', {
            targets: { 
                node: 'current'
            },
        } ]
    ];

    const plugins = [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-runtime',
    ];

    return {
        env,
        plugins,
        presets,
    };
};
