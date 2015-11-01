## Stylus Flexbox grid system for Meteor

- [Meteor sGrid Website](http://s-grid.meteor.com/)
- [More complex docs and grid examples - stylusgrid.com](http://stylusgrid.com/)
- [Blog post about it](http://julian.io/s-grid-working-with-flexible-box-layouts/)

**It is now ready for Meteor 1.2** (use version 1.1.1 for older Meteor projects)

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

Also check out [http://stylusgrid.com/](stylusgrid.com)

### Simple examples

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

### Use PostCSS plugins with Stylus

From version 2.1.0 you can use PostCSS and PostCSS plugins with this package. It is possible because of Stylus plugin which is called [poststylus](https://github.com/seaneking/poststylus).

(You don't have to add `autoprefixer`. It is added by default because s-grid needs it.)

**To use PostCSS plugins all you need to do is:**

##### 1. Prepare a local Meteor package in `/packages` folder.
You can call it as you want. For example let's call it `postcss:plugins` and let's place it in the `postcss-plugins` folder. In `/packages/postcss-plugins` create `package.js` file. Example:

```javascript
Package.describe({
    summary: 'PostCSS default plugins set',
    version: '1.0.0',
    name: 'postcss:plugins',
    git: ''
});

// your PostCSS plugins here:
Npm.depends({
    'rucksack-css': '0.8.5'
});
```

Next add the package by `meteor add postcss:plugins`.

##### 2. You need a config file which is called `sgrid.json`.
Place it in the root folder of your app. Below is an example file which will add [rucksack-css](https://github.com/simplaio/rucksack) PostCSS plugin to your Stylus build stack:

```javascript
{
    "postcss": {
        "plugins": [
            {
                "name": "rucksack-css",
                "options": {},
                "dirName": "postcss-plugins"
            }
        ]
    }
}
```

* **name** - PostCSS plugin name needed in PostCSS plugins API inside the build plugin (this is dynamic so we need to pass it somewhere)
* **options** - PostCSS plugins has options which you can pass. Like for example Rucksack
Npm.require("rucksack-css")({responsiveType: false}); So here in the config options object you need to pass 'responsiveType: false'.
* **dirName** - we need to point where are node_modules folders, we need to pass local package folder name here. (In this example it is 'postcss-plugins')

Then restart your Meteor App.

##### 3. Now you can use all the features which are provided by Rucksack plugin.
So in your .styl file you could write something like:

Stylus:
```stylus
@alias
  fs font-size
  bg background
  c color

.item
    fs 30px
    bg #000
    c #fff
```

Compiled to (with Rucksack):
```css
.item
    font-size 30px
    background-color #000
    color #fff
```

Unfortunately for now in Meteor there isn't simpler way to include custom PostCSS plugins from outside.

### Grid website and docs

- [stylusgrid.com](http://stylusgrid.com)

### License

MIT

### Changelog

#### v2.1.0
- You can use PostCSS plugins with Stylus

#### v2.0.2
- sGrid update

#### v2.0.1
- sGrid update
- autoprefixer update

#### v2.0.0
- Stylus compiler update - package is ready for Meteor 1.2

#### v1.1.1
- Stylus and Autoprefixer updates

#### v1.1.0
- fix related with wrong paths for additional plugins
- autoprefixer update

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
