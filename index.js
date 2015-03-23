
module.exports = plugin;

function plugin(options) {
  options = options || {};

  var selectors = options.selectors || [
    'before',
    'after',
    'first-letter',
    'first-line'
  ]

  return function(css) {
    css.eachRule(function(rule) {

      selectors.forEach(function(selector) {
        rule.selectors.forEach(function(selector) {

          rule.selector = selector.replace(new RegExp('::(' + selectors.join('|') + ')', 'gi'), ':$1');

        });

      });

    });
  }
}
