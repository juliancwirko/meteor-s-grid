const appModulePath = Npm.require('app-module-path');
appModulePath.addPath(process.cwd() + '/packages');

const stylus = Npm.require('stylus');
const poststylus = Npm.require('poststylus');
const autoprefixer = Npm.require('autoprefixer');
const sGrid = Npm.require('s-grid');
const rupture = Npm.require('rupture');
const Future = Npm.require('fibers/future');
const fs = Plugin.fs;
const path = Plugin.path;

Plugin.registerCompiler({
  extensions: ['styl'],
  archMatching: 'web'
}, () => new StylusCompiler());

const CONFIG_FILE_NAME = 'sgrid.json';

const projectOptionsFile = path.resolve(process.cwd(), CONFIG_FILE_NAME);

let loadJSONFile = function (filePath) {
  let content = fs.readFileSync(filePath);
  try {
      return JSON.parse(content);
  } catch (e) {
      console.log('Error: failed to parse ', filePath, ' as JSON');
      return {};
  }
};

let configOptions = {};

if (fs.existsSync(projectOptionsFile)) {
  configOptions = loadJSONFile(projectOptionsFile);
}

let getPostCSSPlugins = function () {
  // autoprefixer in default
  let plugins = [autoprefixer({browsers: ['last 2 versions']})];
  if (configOptions && configOptions.postcss && configOptions.postcss.plugins) {
    configOptions.postcss.plugins.forEach(function (pluginObj) {
      plugins.push(Npm.require(pluginObj.dirName + '/.npm/package/node_modules/' + pluginObj.name)(pluginObj.options));
    });
  }
  return plugins;
};

// CompileResult is {css, sourceMap}.
class StylusCompiler extends MultiFileCachingCompiler {
  constructor() {
    super({
      compilerName: 'stylus',
      defaultCacheSize: 1024*1024*10,
    });
  }

  getCacheKey(inputFile) {
    return inputFile.getSourceHash();
  }

  compileResultSize(compileResult) {
    return compileResult.css.length +
      this.sourceMapSize(compileResult.sourceMap);
  }

  // The heuristic is that a file is an import (ie, is not itself processed as a
  // root) if it is in a subdirectory named 'imports' or if it matches
  // *.import.styl. This can be overridden in either direction via an explicit
  // `isImport` file option in api.addFiles.
  isRoot(inputFile) {
    const fileOptions = inputFile.getFileOptions();
    if (fileOptions.hasOwnProperty('isImport')) {
      return !fileOptions.isImport;
    }

    const pathInPackage = inputFile.getPathInPackage();
    return !(/\.import\.styl$/.test(pathInPackage) ||
             /(?:^|\/)imports\//.test(pathInPackage));
  }

  compileOneFile(inputFile, allFiles) {
    const referencedImportPaths = [];

    function parseImportPath(filePath, importerDir) {
      if (! filePath) {
        throw new Error('filePath is undefined');
      }
      if (filePath === inputFile.getPathInPackage()) {
        return {
          packageName: inputFile.getPackageName() || '',
          pathInPackage: inputFile.getPathInPackage()
        };
      }
      if (! filePath.match(/^\{.*\}\//)) {
        if (! importerDir) {
          return { packageName: inputFile.getPackageName() || '',
                   pathInPackage: filePath };
        }

        // relative path in the same package
        const parsedImporter = parseImportPath(importerDir, null);

        // resolve path if it is absolute or relative
        const importPath =
          (filePath[0] === '/') ? filePath :
            path.join(parsedImporter.pathInPackage, filePath);

        return {
          packageName: parsedImporter.packageName,
          pathInPackage: importPath
        };
      }

      const match = /^\{(.*)\}\/(.*)$/.exec(filePath);
      if (! match) { return null; }

      const [ignored, packageName, pathInPackage] = match;
      return {packageName, pathInPackage};
    }
    function absoluteImportPath(parsed) {
      return '{' + parsed.packageName + '}/' + parsed.pathInPackage;
    }

    const importer = {
      find(importPath, paths) {
        const parsed = parseImportPath(importPath, paths[paths.length - 1]);
        if (! parsed) { return null; }

        if (importPath[0] !== '{') {
          // if it is not a custom syntax path, it could be a lookup in a folder
          for (let i = paths.length - 1; i >= 0; i--) {
            const joined = path.join(paths[i], importPath);
            if (fs.exists(joined))
              return [joined];
          }
        }

        const absolutePath = absoluteImportPath(parsed);

        if (! allFiles.has(absolutePath)) {
          return null;
        }

        return [absolutePath];
      },
      readFile(filePath) {
        const isAbsolute = filePath[0] === '/';
        const isPostCss = filePath.indexOf('/node_modules/poststylus/') !== -1;
        const isSGrid = filePath.indexOf('/node_modules/s-grid/') !== -1;
        const isRupture = filePath.indexOf('/node_modules/rupture/rupture/') !== -1;
        const isStylusBuiltIn = filePath.indexOf('/node_modules/stylus/lib/') !== -1;

        if (isAbsolute || isPostCss || isSGrid || isRupture || isStylusBuiltIn) {
          // absolute path? let the default implementation handle this
          return fs.readFileSync(filePath, 'utf8');
        }

        const parsed = parseImportPath(filePath);
        const absolutePath = absoluteImportPath(parsed);

        referencedImportPaths.push(absolutePath);

        if (! allFiles.has(absolutePath)) {
          throw new Error(
            `Cannot read file ${absolutePath} for ${inputFile.getDisplayPath()}`
          );
        }

        return allFiles.get(absolutePath).getContentsAsString();
      }
    };

    function processSourcemap(sourcemap) {
      delete sourcemap.file;
      sourcemap.sourcesContent = sourcemap.sources.map(importer.readFile);
      sourcemap.sources = sourcemap.sources.map((filePath) => {
        const parsed = parseImportPath(filePath);
        if (!parsed.packageName)
          return parsed.pathInPackage;
        return 'packages/' + parsed.packageName + '/' + parsed.pathInPackage;
      });

      return sourcemap;
    }

    const f = new Future;

    const style = stylus(inputFile.getContentsAsString())
            .use(sGrid())
            .use(rupture())
            .use(poststylus(getPostCSSPlugins()))
            .set('filename', inputFile.getPathInPackage())
            .set('sourcemap', { inline: false, comment: false })
            .set('cache', false)
            .set('importer', importer);

    style.render(f.resolver());
    let css;
    try {
      css = f.wait();
    } catch (e) {
      inputFile.error({
        message: 'Stylus compiler error: ' + e.message
      });
      return null;
    }
    const sourceMap = processSourcemap(style.sourcemap);
    return {referencedImportPaths, compileResult: {css, sourceMap}};
  }

  addCompileResult(inputFile, {css, sourceMap}) {
    inputFile.addStylesheet({
      path: inputFile.getPathInPackage() + '.css',
      data: css,
      sourceMap: sourceMap
    });
  }
}