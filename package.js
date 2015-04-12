Package.describe({
    summary: 'Stylus Flexbox grid system for Meteor',
    version: "1.0.0",
    name: 'juliancwirko:s-grid',
    git: 'https://github.com/juliancwirko/meteor-s-grid.git'
});

Package._transitional_registerBuildPlugin({
    name: "compileStylus",
    use: [],
    sources: [
        'plugin/compile-stylus.js'
    ],
    npmDependencies: {
        'stylus': "0.50.0",
        'autoprefixer-stylus': '0.5.0',
        'rupture': "0.6.1",
        's-grid': '1.0.0'
    }
});
