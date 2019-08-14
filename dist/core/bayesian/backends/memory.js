"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoryBackend = void 0;

var _underscore = require("underscore");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MemoryBackend = function MemoryBackend() {
  _classCallCheck(this, MemoryBackend);

  this.catCounts = {};
  this.wordCounts = {};
};

MemoryBackend.prototype = {
  async: false,
  incCounts: function incCounts(catIncs, wordIncs) {
    (0, _underscore._)(catIncs).each(function (inc, cat) {
      this.catCounts[cat] = this.catCounts[cat] + inc || inc;
    }, this);
    (0, _underscore._)(wordIncs).each(function (incs, word) {
      this.wordCounts[word] = this.wordCounts[word] || {};
      (0, _underscore._)(incs).each(function (inc, cat) {
        this.wordCounts[word][cat] = this.wordCounts[word][cat] + inc || inc;
      }, this);
    }, this);
  },
  getCats: function getCats() {
    return this.catCounts;
  },
  getWordCounts: function getWordCounts(words, cats) {
    return this.wordCounts;
  },
  toJSON: function toJSON() {
    return {
      cats: this.catCounts,
      words: this.wordCounts
    };
  },
  fromJSON: function fromJSON(json) {
    this.catCounts = json.cats;
    this.wordCounts = json.words;
  }
};
var _MemoryBackend = MemoryBackend;
exports.MemoryBackend = _MemoryBackend;