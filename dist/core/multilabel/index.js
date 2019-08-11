"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThresholdClassifier = exports.CrossLanguageModel = exports.MetaLabeler = exports.MulticlassSegmentation = exports.BinarySegmentation = exports.BinaryRelevance = void 0;

var BinaryRelevance = require('./BinaryRelevance');

exports.BinaryRelevance = BinaryRelevance;

var BinarySegmentation = require('./BinarySegmentation');

exports.BinarySegmentation = BinarySegmentation;

var MulticlassSegmentation = require('./MulticlassSegmentation');

exports.MulticlassSegmentation = MulticlassSegmentation;

var MetaLabeler = require('./MetaLabeler');

exports.MetaLabeler = MetaLabeler;

var CrossLanguageModel = require('./CrossLangaugeModelClassifier');

exports.CrossLanguageModel = CrossLanguageModel;

var ThresholdClassifier = require('./ThresholdClassifier'); // add a "classify and log" method to all classifiers, for demos:


exports.ThresholdClassifier = ThresholdClassifier;

for (var classifierClass in module.exports) {
  if (module.exports[classifierClass].prototype && module.exports[classifierClass].prototype.classify) module.exports[classifierClass].prototype.classifyAndLog = function (sample) {
    console.log(sample + " is " + this.classify(sample));
  };
}