## Stylus Flexbox grid system for Meteor

- [Meteor sGrid Website](http://s-grid.meteor.com/)
- [More complex docs and grid examples - stylusgrid.com](http://stylusgrid.com/)
- Blog post: [sGrid - Working with Flexible Box layouts](http://julian.io/s-grid-working-with-flexible-box-layouts/)
- Blog post: [My workflow with the Stylus and Flexbox grid system](https://medium.com/@juliancwirko/my-workflow-with-the-stylus-and-flexbox-grid-system-5f4f50ac3f33)
- Article on Sitepoint.com: [Introducing sGrid: A Stylus-based Flexbox Grid System](http://www.sitepoint.com/introducing-sgrid-a-stylus-based-flexbox-grid-system/)

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

From version 2.2.0 to use PostCSS with this package you will need to install [meteorhacks:npm](https://github.com/meteorhacks/npm) package and you should do it by hand because not all users want to use PostCSS additional plugins so it will not be added automatically. Read more below.

**You don't have to add `autoprefixer`. It is added by default because s-grid needs it. You can configure it. Read more about it below.**

**To use PostCSS plugins all you need to do is:**

#### 1. Add `meteorhacks:npm` package

```
$ meteor add meteorhacks:npm
```

When you run your Meteor app there will be `packages.json` file created in the root of your app. You can specify PostCSS plugins there (standard npm packages). Example:

**packages.json (npm packages):**
```
{
    "rucksack-css": "0.8.5"
}
```

Restart your app.
Of course you can use `meteorhacks:npm` as always.
PostCSS will know which Npm packages are PostCSS plugins and which are not.

#### 2. If you need to pass some options to your PostCSS plugins create options file `sgrid.json` in the root app folder.

Example of options file (passing some options to the autoprefixer plugin):

**sgrid.json (PostCSS plugins options - this file is optional):**
```
{
    "postcss": {
        "pluginsOptions": {
            "autoprefixer": {"browsers": ["last 2 versions"]}
        }
    }
}
```

#### 3. Now you can use all the features which are provided by Rucksack plugin.

So in our example in .styl file you could write something like:

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

**Of course you can add more PostCSS plugins. There is no need to use PostCSS plugins which are responsible for imports, variables etc because it is all in Stylus, but sometimes there are great PostCSS plugins out there.**

Unfortunately for now in Meteor there isn't simpler way to include custom PostCSS plugins from outside. You need to use `meteorhacks:npm` package which is great.

If you want to change something in `sgrid.json` config file later, you should restart your app and also change any .style file to rerun build plugin.

### Grid website and docs

- [stylusgrid.com](http://stylusgrid.com)

### Also check out:

- [PostCSS for Meteor](https://atmospherejs.com/juliancwirko/postcss)

### License

MIT

### Changelog

#### v2.2.3
- Stylus update
- Autoprefier update

#### v2.2.2
- sGrid update

#### v2.2.1
- Autoprefixer update

#### v2.2.0
- If you want to use PostCSS we now use `meteorhacks:npm` container for it

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
