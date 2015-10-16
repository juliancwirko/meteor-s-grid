## Stylus Flexbox grid system for Meteor

- [More complex docs and grid examples: stylusgrid.com](http://stylusgrid.com/)
- [Blog post about it](http://julian.io/s-grid-working-with-flexible-box-layouts/)

**It is now ready for Meteor 1.2** (use version 1.1.1 for older Meteor projects)

**Important note:**
From version 2.0.0 problematic sgrid.json config file is removed. New Meteor build plugin is better.

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


### Grid website and docs

- [stylusgrid.com](http://stylusgrid.com)

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

- - -

### Grid Inspired by:

* Cory Simmons: (Creator of Jeet grid system and many other grid tools) [https://github.com/corysimmons](https://github.com/corysimmons)
* Philip Walton (Solved by Flexbox): [http://philipwalton.github.io/solved-by-flexbox/demos/grids/](http://philipwalton.github.io/solved-by-flexbox/demos/grids/)
* CSS tricks: [http://css-tricks.com/snippets/css/a-guide-to-flexbox/](http://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* Foundation for Apps grid [http://foundation.zurb.com/apps/docs/#!/grid](http://foundation.zurb.com/apps/docs/#!/grid)

### License

MIT

### Changelog

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
