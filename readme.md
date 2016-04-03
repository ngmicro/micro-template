# Micro Template

Micro Template is an Angular Service to give **`in-script`** templates. With Micro Template you can bundle your templates in single **`<script>`** tag and use them in **` { template: 'HERE' }`**.

**Why?**

If you want to budle your view, directive, or component templates in a single page without additional AJAX request to load the templates, then Micro Template maybe useful. You can concat and minify the templates and inject them to the page using micro template script tag.

***

## Installation

```bash
bower install --save angular-micro-template
```

***

## Usage

To use Micro Template, you need to add micro template script tag (**`type="text/html+micro-template"`**) before you load the micro-template script, and load the micro-template script right after the angular.

**Example**

```html
<script type="text/html+micro-template">
	<micro-template id="mc-welcome">
    	<p>Welcome, {{ name }}</p>
    </micro-template>
	<micro-template id="mc-input">
    	<p class="label">{{ ctrl.label }}</p>
    	<input type="text" ng-model="ctrl.model">
    </micro-template>
</script>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-micro-template/micro-template.js"></script>
```

We wrap the templates using script tag to prevent angular rendering the templates as a regular elements.

If you want to remove the script tag after micro-template loaded, add **`nokeep`** attribute to the script tag.

**Example**

```html
<script type="text/html+micro-template" nokeep></script>
```

After loaded, Micro Template will add **`NGMicro.template`** function to window and create service named **`MicroService`**.

**Example**

**`test/test.js`** on this repository.

```javascript
(function () {
    angular.module('main', [ 'MicroTemplate' ])
        // Usage in component without factory.
        .component('mcTest', {
            strict     : 'E',
            template   : NGMicro.template('mc-test'),
            transclude : true
        })
        // Usage in directive with factory.
        .directive('mcInput', function ( MicroTemplate ) {
            return {
                strict   : 'E',
                template : MicroTemplate('mc-input'),
                scope    : {
                    label : '@',
                    model : '='
                }
            }
        })
        .controller('McInput', McInputController)

    function McInputController () {
        var vm = this;

        vm.value = 'Lorem ipsum dolor';
    }
})();
```

See **`test.html`** and **`test/test.js`** files inside this repository for usage sample.

***

### **`<micro-template>`**

Each templates should be wrapped with **`<micro-template>`** tag and give attribute **`id`** as template id. Without wrapping with this tag including the id, Micro Template Service will never knows your templates.

**Example**

```html
<micro-template id="mc-welcome">
	<span>Welcome, {{ name }}</span>
</micro-template>
```

***

## The MIT License **`(MIT)`**

Copyright © 2016 Nanang Mahdaen El Agung

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

