import 'core-js/es/array/find';
import 'core-js/es/array/from';
import 'core-js/es/array/find-index';
import 'core-js/es/string/starts-with';
import 'core-js/es/promise';
import 'core-js/es/object/assign';
import 'core-js/es/object/keys';
import 'core-js/es/map';
import 'core-js/es/set';

if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;
    if (!document.documentElement.contains(el)) {
      return null;
    }

    do {
      if (el.matches(s)) {
        return el;
      }
      el = el.parentElement;
    } while (el !== null);
    return null;
  };
}
