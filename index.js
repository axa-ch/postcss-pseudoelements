
module.exports = plugin;

function plugin(options) {
  options = options || {};

  var selectors = options.selectors || [
    'before',
    'after'
  ]

  return function(css) {
    css.eachRule(function(rule) {

      selectors.forEach(function(selector) {
        rule.selectors.forEach(function(selector) {

          var singleSelector = selector.replace(new RegExp('::(' + selectors.join('|') + ')', 'gi'), ':$1');
          var doubleSelector = selector.replace(new RegExp('(^|[^:]):(' + selectors.join('|') + ')', 'gi'), '$1::$2');

          if(!containsSelector(rule.selectors, singleSelector)) {
            rule.selector += ', ' + singleSelector;
          }

          if(!containsSelector(rule.selectors, doubleSelector)) {
            rule.selector += ', ' + doubleSelector;
          }

        });

      });

    });
  }
}

function containsSelector(selectors, search) {
  var retval = false;

  selectors.forEach(function(selector) {
    if(selector == search) {
      retval = true;
      return false;
    }
  });

  return retval;
}

/*

if(selector.search(new RegExp('[^:]' + search, 'i')) != -1) {
  var foundMatchingSelector = false;

  // TODO: may implement regex escaping
  completedSelector = selector.replace(new RegExp('([^:])' + search, 'gi'), '$1'+complete);

  rule.selectors.forEach(function(selector2) {
    if(selector2 == completedSelector)
      foundMatchingSelector = true;
      return false;
  })

  if(!foundMatchingSelector) {
    rule.selector += ', ' + completedSelector;
  }

}*/
