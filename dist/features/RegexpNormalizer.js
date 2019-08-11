"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/**
 * normalizes a sentence based on a list of regular expressions.
 * @param normalizations - an array of objects {source: /regexp/g, target: "target"}
 * @param sample - a string.
 * @return a new string, with all normalizations carried out.
 */
function _default(normalizations) {
  return function (sample) {
    normalizations.forEach(function (normalization) {
      var matches = null;

      if (normalization.source instanceof RegExp) {
        if (!normalization.source.global) {
          console.warn("normalization source, " + normalization.source + ", is not global - skipping");
          return;
        }
      } else {
        normalization.source = new RegExp(normalization.source, "gi");
      }

      sample = sample.replace(normalization.source, normalization.target); //console.log(sample);
    });
    return sample;
  };
}

;