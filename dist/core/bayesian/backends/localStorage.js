"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalStorageBackend = void 0;

var _underscore = require("underscore");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalStorageBackend = function LocalStorageBackend(options) {
  _classCallCheck(this, LocalStorageBackend);

  options = options || {};
  var name = options.name || Math.floor(Math.random() * 100000);
  this.prefix = "classifier.bayesian." + name;

  if (options.testing) {
    this.storage = {};
  } else {
    this.storage = localStorage;
  }

  if (!this.storage[this.prefix + ".cats"]) {
    this.storage[this.prefix + ".cats"] = "{}";
  }
};

LocalStorageBackend.prototype = {
  async: false,
  getCats: function getCats() {
    return JSON.parse(this.storage[this.prefix + ".cats"]);
  },
  setCats: function setCats(cats) {
    this.storage[this.prefix + ".cats"] = JSON.stringify(cats);
  },
  getWordCount: function getWordCount(word) {
    return JSON.parse(this.storage[this.prefix + ".words." + word] || "{}");
  },
  setWordCount: function setWordCount(word, counts) {
    this.storage[this.prefix + ".words." + word] = JSON.stringify(counts);
  },
  getWordCounts: function getWordCounts(words) {
    var counts = {};
    words.forEach(function (word) {
      counts[word] = this.getWordCount(word);
    }, this);
    return counts;
  },
  incCounts: function incCounts(catIncs, wordIncs) {
    var cats = this.getCats();
    (0, _underscore._)(catIncs).each(function (inc, cat) {
      cats[cat] = cats[cat] + inc || inc;
    }, this);
    this.setCats(cats);
    (0, _underscore._)(wordIncs).each(function (incs, word) {
      var wordCounts = this.getWordCount(word);
      (0, _underscore._)(incs).each(function (inc, cat) {
        wordCounts[cat] = wordCounts[cat] + inc || inc;
      }, this);
      this.setWordCount(word, wordCounts);
    }, this);
  },
  toJSON: function toJSON() {
    var words = {};
    var regex = new RegExp("^" + this.prefix + "\\.words\\.(.+)$");

    for (var item in this.storage) {
      var match = regex.exec(item);

      if (match) {
        words[match[1]] = JSON.parse(this.storage[item]);
      }
    }

    return {
      cats: JSON.parse(this.storage[this.prefix + ".cats"]),
      words: words
    };
  },
  fromJSON: function fromJSON(json) {
    this.incCounts(json.cats, json.words);
  }
};
var _LocalStorageBackend = LocalStorageBackend;
exports.LocalStorageBackend = _LocalStorageBackend;