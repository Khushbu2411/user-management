module.exports = {
    rules: {
        indent: [
            'error',
            4,
            { SwitchCase: 1, ignoredNodes: ['TemplateLiteral'] },
        ],
        'linebreak-style': [
            'error',
            'unix'],
        semi: [
            'error',
            'always',
        ],
        'no-console': 0,
        'react/no-unused-prop-types': 0,
        'no-mixed-spaces-and-tabs': 0,
        'react/prop-types': 0,
        'react/display-name': 0,
        'no-unused-vars': 0,
    },
};
