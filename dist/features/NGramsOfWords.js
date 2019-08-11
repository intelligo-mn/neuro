"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _NGramsFromArray = _interopRequireDefault(require("./NGramsFromArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * NGramExtractor - extracts sequences of words in a text as its features.
 */
function _default(numOfWords, gap) {
  return function (sample, features) {
    var words = sample.split(/[ \t,;:.!?]/).filter(function (a) {
      return !!a;
    }); // all non-empty words

    (0, _NGramsFromArray["default"])(numOfWords, gap, words, features);
  };
}

;