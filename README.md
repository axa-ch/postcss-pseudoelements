# postcss-pseudoelements

## usage

```javascript
var pe = require('postcss-pseudoelements');
var postcss = require('postcss');

var processor = postcss(pe({ selectors: ['before', 'after']}));

console.log(processor.process('a:before {}').css) // outputs: a:before, a::before {}
console.log(processor.process('a::before {}').css) // outputs: a::before, a:before {}
```

## options

`selectors`: Array of pseudo-element selectors to rewrite with single and double colons. Defaults to `['before','after']` 
