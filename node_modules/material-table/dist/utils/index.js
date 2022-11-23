"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.byString = void 0;

var byString = function byString(o, s) {
  if (!s) {
    return;
  }

  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties

  s = s.replace(/^\./, ''); // strip a leading dot

  var a = s.split('.');

  for (var i = 0, n = a.length; i < n; ++i) {
    var x = a[i];

    if (o && x in o) {
      o = o[x];
    } else {
      return;
    }
  }

  return o;
};

exports.byString = byString;