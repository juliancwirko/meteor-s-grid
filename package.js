Package.describe({
    summary: 'Stylus Flexbox grid system for Meteor with PostCSS and included Autoprefixer',
    version: '2.2.3',
    name: 'juliancwirko:s-grid',
    git: 'https://github.com/juliancwirko/meteor-s-grid.git'
});

Package._transitional_registerBuildPlugin({
    name: 'compileStylus',
    use: ['ecmascript@0.1.6', 'caching-compiler@1.0.0'],
    sources: [
        'plugin/compile-stylus.js'
    ],
    npmDependencies: {
        'app-module-path': '1.0.5',
        'stylus': '0.53.0',
        'poststylus': '0.2.2',
        'autoprefixer': '6.1.2',
        'rupture': '0.6.1',
        's-grid': '1.1.2'
    }
});

Package.onUse(function (api) {
  api.use('isobuild:compiler-plugin@1.0.0');
});