module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolver', {
            alias: {
                "@core": "./src/core",
                "@application": "./src/application",
                "@domain": "./src/domain",
                "@infra": "./src/infra"
            }
        }]
    ],
    ignore: [
        '**/*.test.ts'
    ]
}