
var appModulePath = Npm.require('app-module-path');
appModulePath.addPath(process.cwd() + '/packages');
var fs = Npm.require('fs');
var stylus = Npm.require('stylus');
var autoprefixer = Npm.require('autoprefixer-stylus');
var sGrid = Npm.require('s-grid');
var rupture = Npm.require('rupture');
var path = Npm.require('path');
var Future = Npm.require('fibers/future');
var _ = Npm.require('underscore');

var CONFIG_FILE_NAME = 'sgrid.json';

var projectOptionsFile = path.resolve(process.cwd(), CONFIG_FILE_NAME);

var loadJSONFile = function (filePath) {
    var content = fs.readFileSync(filePath);
    try {
        return JSON.parse(content);
    } catch (e) {
        console.log('Error: failed to parse ', filePath, ' as JSON');
        return {};
    }
};

var sGridOptions = {};

if (fs.existsSync(projectOptionsFile)) {
    sGridOptions = loadJSONFile(projectOptionsFile);
}

var stylusStep = function (compileStep) {
    if (sGridOptions.includePaths) {
        return stylus(compileStep.read().toString('utf8'))
            .set('paths', sGridOptions.includePaths);
    }
    return stylus(compileStep.read().toString('utf8'));
};

// default and needed modules
var sGridPlugins = [autoprefixer, rupture, sGrid];

if (sGridOptions.includePlugins && sGridOptions.pluginsDirName) {
    sGridOptions.includePlugins.forEach(function (p) {
        sGridPlugins.push(Npm.require(sGridOptions.pluginsDirName + '/.npm/package/node_modules/' + p));
    });
}

var sPlugins = function () {
    var self = this;
    if (_.isArray(sGridPlugins)) {
        sGridPlugins.forEach(function (f) {
            if (_.isFunction(f)) {
                self.use(f());
            }
        });
    }
    return self;
};

Plugin.registerSourceHandler('styl', {
    archMatching: 'web'
}, function (compileStep) {
    var f = new Future();
    var css;

    stylusStep(compileStep)
        .use(sPlugins)
        .set('filename', compileStep.inputPath)
        .include(path.dirname(compileStep._fullInputPath))
        .render(f.resolver());

    try {
        css = f.wait();
    } catch (e) {
        compileStep.error({
            message: 'Stylus compiler error: ' + e.message
        });
        return;
    }
    compileStep.addStylesheet({
        path: compileStep.inputPath + '.css',
        data: css
    });
});

Plugin.registerSourceHandler('import.styl', function () {
    // Do nothing
});
