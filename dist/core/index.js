"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnhancedClassifier = exports.multilabel = exports.DecisionTree = exports.Winnow = exports.Perceptron = exports.SvmLinear = exports.SvmPerf = exports.SvmJs = exports.kNN = exports.Bayesian = exports.NeuralNetwork = void 0;

var NeuralNetwork = require('./neural/NeuralNetwork');

exports.NeuralNetwork = NeuralNetwork;

var Bayesian = require('./bayesian/bayesian');

exports.Bayesian = Bayesian;

var kNN = require('./kNN/kNN');

exports.kNN = kNN;

var SvmJs = require('./svm/SvmJs');

exports.SvmJs = SvmJs;

var SvmPerf = require('./svm/SvmPerf');

exports.SvmPerf = SvmPerf;

var SvmLinear = require('./svm/SvmLinear');

exports.SvmLinear = SvmLinear;

var Perceptron = require('./perceptron/PerceptronHash');

exports.Perceptron = Perceptron;

var Winnow = require('./winnow/WinnowHash')["default"];

exports.Winnow = Winnow;

var DecisionTree = require('./decisiontree/DecisionTree');

exports.DecisionTree = DecisionTree;

var multilabel = require('./multilabel');

exports.multilabel = multilabel;

var EnhancedClassifier = require('./EnhancedClassifier');

exports.EnhancedClassifier = EnhancedClassifier;