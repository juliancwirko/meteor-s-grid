Package.describe({
    summary: 'Stylus Flexbox grid system for Meteor',
    version: '2.0.0',
    name: 'juliancwirko:s-grid',
    git: 'https://github.com/juliancwirko/meteor-s-grid.git'
});

Package._transitional_registerBuildPlugin({
    name: 'compileStylus',
    use: ['ecmascript@0.1.4', 'caching-compiler@1.0.0'],
    sources: [
        'plugin/compile-stylus.js'
    ],
    npmDependencies: {
        'stylus': '0.52.4',
        'autoprefixer-stylus': '0.7.1',
        'rupture': '0.6.1',
        's-grid': '1.0.1'
    }
});

Package.onUse(function (api) {
  api.use('isobuild:compiler-plugin@1.0.0');
});