

import "core-js/es6/object.js"
import "core-js/es6/array.js"

import "core-js/es6/symbol.js";
import "core-js/es6/set.js";
import "core-js/es6/map.js";


import 'promise/polyfill';


if (!Element.prototype.matches) {
    // @ts-ignore
    Element.prototype.matches = Element.prototype.msMatchesSelector
    || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function (s:any) {
        var el:any = this;
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
