"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectionOfExtractors = CollectionOfExtractors;
exports.NGramsFromArray = NGramsFromArray;
exports.NGramsOfWords = NGramsOfWords;
exports.call = call;
exports.normalize = normalize;
exports.RegexpSplitter = exports.RegexpNormalizer = exports.LowerCaseNormalizer = exports.FeatureLookupTable = exports.Hypernyms = exports.NGramsOfLetters = void 0;

var NGramsOfLetters = require("./NGramsOfLetters");

exports.NGramsOfLetters = NGramsOfLetters;

var Hypernyms = require("./HypernymExtractor");

exports.Hypernyms = Hypernyms;

var FeatureLookupTable = require("./FeatureLookupTable");

exports.FeatureLookupTable = FeatureLookupTable;

var LowerCaseNormalizer = require("./LowerCaseNormalizer");

exports.LowerCaseNormalizer = LowerCaseNormalizer;

var RegexpNormalizer = require("./RegexpNormalizer");

exports.RegexpNormalizer = RegexpNormalizer;

var RegexpSplitter = require("./RegexpSplitter");
/**
 * CollectionOfExtractors - combines the features from several feature extractors. 
 * @param extractors - an array of other feature extractors. 
 * @param sample - a string.
 * @param features an initial hash of features (optional).
 * @return a hash with all features generated from the sample by the different extractors
 */


exports.RegexpSplitter = RegexpSplitter;

function CollectionOfExtractors(extractors) {
  return function (sample, features) {
    for (var i = 0; i < extractors.length; ++i) {
      extractors[i](sample, features);
    }
  };
}

;
/**
 * Convert an array of words/tokens to a set of n-grams, for a given n, possibly with a gap:
 */

function NGramsFromArray(numOfWords, gap, grams, features) {
  for (var i = 0; i < numOfWords - 1 - (gap ? 1 : 0); ++i) {
    grams.unshift("[start]");
    grams.push("[end]");
  }

  for (var i = 0; i <= grams.length - numOfWords; ++i) {
    var sliceOfWords = grams.slice(i, i + numOfWords);
    if (gap) sliceOfWords[1] = "-";
    var feature = sliceOfWords.join(" ");
    features[feature.trim()] = 1;
  }

  for (var i = 0; i < numOfWords - 1 - (gap ? 1 : 0); ++i) {
    grams.pop();
    grams.shift();
  }
}

function NGramsOfWords(numOfWords, gap) {
  return function (sample, features) {
    var words = sample.split(/[ \t,;:.!?]/).filter(function (a) {
      return !!a;
    }); // all non-empty words

    NGramsFromArray(numOfWords, gap, words, features);
  };
}
/**
 * Call the given featureExtractor on the given sample, and return the result.
 * Used for testing.
 */


function call(featureExtractor, sample) {
  var features = {};
  featureExtractor(sample, features);
  return features;
}
/**
 * If the input is a featureExtractor, return it as is.
 *
 * If it is an array of featureExtractors, convert it to a CollectionOfExtractors.
 *
 */


function normalize(featureExtractorOrArray) {
  return !featureExtractorOrArray ? featureExtractorOrArray : Array.isArray(featureExtractorOrArray) ? new CollectionOfExtractors(featureExtractorOrArray) : featureExtractorOrArray;
}