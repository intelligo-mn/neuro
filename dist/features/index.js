"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.call = call;
exports.normalize = normalize;
exports.RegexpSplitter = exports.RegexpNormalizer = exports.LowerCaseNormalizer = exports.FeatureLookupTable = exports.CollectionOfExtractors = exports.Hypernyms = exports.NGramsOfLetters = exports.NGramsOfWords = exports.NGramsFromArray = void 0;

var NGramsFromArray = require("./NGramsFromArray");

exports.NGramsFromArray = NGramsFromArray;

var NGramsOfWords = require("./NGramsOfWords");

exports.NGramsOfWords = NGramsOfWords;

var NGramsOfLetters = require("./NGramsOfLetters");

exports.NGramsOfLetters = NGramsOfLetters;

var Hypernyms = require("./HypernymExtractor");

exports.Hypernyms = Hypernyms;

var CollectionOfExtractors = require("./CollectionOfExtractors")["default"];

exports.CollectionOfExtractors = CollectionOfExtractors;

var FeatureLookupTable = require("./FeatureLookupTable");

exports.FeatureLookupTable = FeatureLookupTable;

var LowerCaseNormalizer = require("./LowerCaseNormalizer");

exports.LowerCaseNormalizer = LowerCaseNormalizer;

var RegexpNormalizer = require("./RegexpNormalizer");

exports.RegexpNormalizer = RegexpNormalizer;

var RegexpSplitter = require("./RegexpSplitter");
/**
 * Call the given featureExtractor on the given sample, and return the result.
 * Used for testing.
 */


exports.RegexpSplitter = RegexpSplitter;

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