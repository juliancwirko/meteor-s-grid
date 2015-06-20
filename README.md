## Stylus Flexbox grid system for Meteor

- [More complex docs and grid examples: s-grid.meteor.com](http://s-grid.meteor.com/)
- [Blog post about it](http://julian.io/s-grid-working-with-flexible-box-layouts/)

## Instalation

Install it:

```
$ meteor add juliancwirko:s-grid
```

Then in your main *.styl file import:

```
@import 's-grid-settings'
@import 's-grid-functions'
@import 's-grid-classes' // optional - only if you want to use helper classes
```

## Usage

You don't need to install the Meteor Stylus package because it is absorbed by s-grid. If you have it installed just uninstall it and install only the s-grid package.

If you want to preview s-grid code You will find the grid files in the standalone npm package: [https://www.npmjs.com/package/s-grid](https://www.npmjs.com/package/s-grid)

You may also want to use the GruntJS based project scaffold with S-Grid and some useful Grunt tasks like usemin, wiredep, livereload etc: [https://www.npmjs.com/package/s-grid-grunt](https://www.npmjs.com/package/s-grid-grunt)

### Version 1.1.0 changes

If you are using `sgrid.json` config file, there are some changes. See description below.

### Version 1.0.0 breaking changes

- cols() is now cell()
- Grid helper classes is optional. You can import s-grid-classes.styl file if you need it.
- Functions parameters order is changed. See below.. you can use named parameters too.

### Simple examples
(More complex documentation: [http://s-grid.meteor.com](http://s-grid.meteor.com))

#### With only functions

**Stylus code**:
```css
section
    grid()
    div
        padding rem-calc(15)
        cell(1, 4)
        &.other-cell
            cell(2, 4, 'bottom')
        &.different-cell
            cell(1, 3, g: 30px)
```

**HTML code**:
```html
<section>
    <div>Lorem ipsum</div>
    <div>Lorem ipsum</div>
    <div class="other-cell">Lorem ipsum</div>
    <div>Lorem ipsum</div>
    <div class="different-cell">Lorem ipsum</div>
</section>
```

#### With only helper classes

**HTML code**:
```
<section class="s-grid-top">
    <div class="s-grid-cell s-grid-cell-md-6">Lorem ipsum</div>
    <div class="s-grid-cell s-grid-cell-md-6">Lorem ipsum</div>
    <div class="s-grid-cell s-grid-cell-bottom s-grid-cell-md-12">Lorem ipsum</div>
    <div class="s-grid-cell s-grid-cell-md-6">Lorem ipsum</div>
    <div class="s-grid-cell s-grid-cell-center s-grid-cell-md-4 s-grid-cell-offset-md-4">Lorem ipsum</div>
</section>
```

### S-Grid functions and classes
(More complex documentation: [http://s-grid.meteor.com](http://s-grid.meteor.com))

#### Functions

- **rem-calc(value)** - calculates rem units.
    - Usage example:
        - `rem-calc(20)`
        - `rem-calc(20px)`
- **grid(direction = 'row', cells-align = 'top', justify = '')** Main grid function.
    - Params:
        - `direction`:
            - `'row'` (default) - cells direction left to right
            - `'row-reverse'` - cells direction right to left
            - `'column'` - cells direction top to bottom
            - `'column-reverse'` - cells direction bottom to top
        - `cells-align` (works only with row and row-reverse directions)
            - `'top'`
            - `'bottom'`
            - `'center'`
            - `'stretch'`
        - `justify`
            - `'start'` - justify all content left or top
            - `'end'` - justify all content right or bottom
            - `'center'` - justify all content center
    - Usage examples:
        - `grid()`
        - `grid('row')`
        - `grid('row-reverse', 'bottom')`
        - `grid(direction: 'column')`
        - `grid(direction: 'column', justify: 'end')`
- **cell(i = 1, cols = columns, align = '', g = gutter)**
    - Params:
        - `i / cols` - fraction
        - `align`:
            - `'top'`
            - `bottom'`
            - `'center'`
        - `g` - gutter
    - Usage examples:
        - `cell(1, 2)`
        - `cell(15, 45, 'top', 30px)`
        - `cell(2, 3, g: 30)`
- **cell-offset(i = 1, cols = columns, g = gutter)**
    - Params:
        - `i / cols` - fraction
        - `g` - gutter
    - Usage examples:
        - `cell-offset(1, 6)`
- **[Rupture](https://github.com/jenius/rupture) media queries**
    - Usage examples:
        - `+above(rem-calc(breakpoints[lg]))`
        - `+below(rem-calc(768px))`
        - `+below(768px)`

#### Helper classes

To use helper classes you need to import `s-grid-classes.styl` file. (Like shown above). You can change main classes name in settings. See how in 'Overwrite settings'.

**Main grid classes**:

- `.s-grid-top` - align cells top
- `.s-grid-bottom` - align cells bottom
- `.s-grid-center` - align cells center (middle)
- `.s-grid-stretch` - stretch cells
- `.s-grid-justify-center` - justify content center
- `.s-grid-justify-start` - justify content top or left
- `.s-grid-justify-end` - justify content bottom or right
- `.s-grid-row` - cells direction left to right
- `.s-grid-row-reverse` - cells direction right to left
- `.s-grid-column` - cells direction top to bottom
- `.s-grid-column-reverse` - cells direction bottom to top

**Main cell classes**:

- `.s-grid-cell-top` - single cell align top
- `.s-grid-cell-center` - single cell align center (middle)
- `.s-grid-cell-bottom` - single cell align bottom

You can also use autogenerated grid helper classes like those from Bootstrap or Foundation. By default you have 12 column based grid. You can change it in settings. See how in 'Overwrite settings'.

**S-Grid generated helper classes**:

- **Pattern: .{gridClass}-{breakpoint-symbol}-{number-of-columns}** - use it on main grid container (block grid)
    - Usage examples:
        - `.s-grid-sm-6`
        - `.s-grid-md-4`
        - `.s-grid-lg-3`
- **Pattern: .{cellClass}-{breakpoint-symbol}-{number-of-columns}** - use it on cell element (custom cell size)
    - Usage examples:
        - `.s-grid-cell-sm-12`
        - `.s-grid-cell-xlg-3`
        - `.s-grid-cell-md-6`
- **Pattern: .{cellClass}-offset-{breakpoint-symbol}-{number-of-columns}** - use it on cell element (offset class)
    - Usage examples:
        - `.s-grid-cell-offset-sm-2`
        - `.s-grid-cell-offset-lg-3`

### Overwrite settings

You can overwrite the settings (from s-grid-settings.styl file), just place your settings after `s-grid-settings` import. Do something like this:

```bash

// main s-grid settings file:

@import 's-grid-settings'

// my new settings goes here:

base-font-size = 16            // base font size it is 16px by default it is used to calculate rem sizes
gutter = 20px                  // gutters size
columns = 12                   // how many columns you need in your grid (usage with helper classes)
gridClassName = 's-grid'       // main grid wraper class name (usage with helper classes)
cellClassName = 's-grid-cell'  // main grid cell class name (usage with helper classes)

breakpoints = {                // media queries breakpoints
    sm: 0,
    md: 640px,
    lg: 1200px,
    xlg: 1440px,
    xxlg: 1920px
}

// s-grid imports:

@import 's-grid-functions'
@import 's-grid-classes'

// ...
// my app styles here..
// ...
```

### Sortable (drag and drop) js plugins integration

There is a default test config with jQuery UI Sortable and RubaXa Sortable here:

[http://sortable-test.s-grid.meteor.com/](http://sortable-test.s-grid.meteor.com/)

It definitely needs more tests. I want to play with masonry layouts too. Based on Flexbox and also in cooperation with other masonry like js plugins.

```javascript
Template.test1.rendered = function () {
    this.$(".grid").sortable({
        items: "> .item",
        cursor: "move"
    });
};

Template.test2.rendered = function () {
    var el = this.find('#rubaxaSortable');
    var sortable = Sortable.create(el);
};
```

# Stylus compile plugin configuration

Even if you don't want to use sGrid with this package you have possibility to use Stylus compile plugin with config file. For now you can add aditional stylus plugins (npm modules) and add more custom file paths for compiler.

## Additional plugins

sGrid uses 3 default plugins (npm modules): `autoprefixer-stylus`, `rupture` and `s-grid` itself. Sometimes you want to use your core stylus compile plugin (here we have compile plugin in sGrid package) and add some more stylus plugins. This is quite hard with Meteor.

If you want to add some more stylus plugins like for example `nib` (or your custom ones) you should prepare two things:

- **Your local Meteor package with npm dependencies. You will need only `package.json` file with content like:**

```
Package.describe({
    summary: 'Your package description here',
    version: "1.0.0",
    name: 'myname:some-other-packages',
    git: ''
});

Npm.depends({
    'nib': '1.1.0',
    'typographic': '2.9.3'
});
```
Of course you need to add the package: `meteor add myname:some-other-packages`

- **Next you should prepare sGrid config file in your app root directory. This file name is `sgrid.json` and its content will be like:**

```
{
    "pluginsDirName": "some-other-packages-directory-name",
    "includePlugins": [
        "nib", "typographic"
    ]
}
```

Remember that plugin name must be the same as npm module name also you need to provide the name of root directory of your `myname:some-other-packages` the one located in the `/packages` directory. It could have different name than your package name, but you should provide it in your `sgrid.json` file.

**After all restart your meteor app**

##Additional include paths

Sometimes you need to create package that will expose one or more .styl files. Then you want to include these files in your main .styl file in your app. Or maybe you want to include only couple of them. With Meteor it is quite complicated. This package tries to simplify it a little bit. Let say that you have for example theme package with one .styl file and your package.js file looks like:

```
Package.describe({
    summary: 'Starter theme for Scotty - Meteor boilerplate',
    version: "0.1.0",
    name: 'scotty:theme',
    git: 'https://github.com/juliancwirko/scotty.git'
});

Package.onUse(function (api) {

    api.addFiles([
        'scotty-theme.import.styl',
    ], 'server', {isAsset: true});

});
```
The .styl file is our asset and it is located on the server. Now we can provide additional path to its folder. Our stylus compile plugin will know about it and we can import the theme file in our main .styl file in the app just like the others, so: `@import 'scotty-theme.import'`

To do this you need to add another information in `sgrid.json` file.

```
{
    "includePaths": [
        ".meteor/local/build/programs/server/assets/packages/scotty_theme"
    ],
    "pluginsDirName": "some-other-packages-directory-name",
    "includePlugins": [
        "nib", "typographic"
    ]
}
```
Here we have `includePaths` array. You can add more similar packages.

**Important note: On an initial startup of the project there will be error related with stylus paths. Just ignore it and restart Meteor. This is because the `.meteor/local/` directory doesn't exist yet. Unfortunately there isn't any other good solution for this with Meteor. But dont worry, this will occure only when you start it for the first time**

This workflow with stylus config file is inspired by excelent Scss package: [fourseven:scss](https://atmospherejs.com/fourseven/scss)

- - -

### Grid Inspired by:

* Cory Simmons: (Creator of Jeet grid system and many other grid tools) [https://github.com/corysimmons](https://github.com/corysimmons)
* Philip Walton (Solved by Flexbox): [http://philipwalton.github.io/solved-by-flexbox/demos/grids/](http://philipwalton.github.io/solved-by-flexbox/demos/grids/)
* CSS tricks: [http://css-tricks.com/snippets/css/a-guide-to-flexbox/](http://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* Foundation for Apps grid [http://foundation.zurb.com/apps/docs/#!/grid](http://foundation.zurb.com/apps/docs/#!/grid)

### License

MIT

### Changelog

#### v1.0.1_2
- some updates
- stylus config file

#### v1.0.1
- better rem-calc() function
- update stylus version

#### v1.0.0
- refactor and api changes
- cols() is now cell()
- Grid helper classes is optional. You can import s-grid-classes.styl file if you need it.
- Functions parameters order is changed. See below.. you can use named parameters too.
