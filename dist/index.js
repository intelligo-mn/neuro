"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bayesian = _interopRequireDefault(require("./core/bayesian/bayesian"));

var _DecisionTree = _interopRequireDefault(require("./core/decisiontree/DecisionTree"));

var _EnhancedClassifier = _interopRequireDefault(require("./core/EnhancedClassifier"));

var _multilabel = _interopRequireDefault(require("./core/multilabel"));

var _NeuralNetwork = _interopRequireDefault(require("./core/neural/NeuralNetwork"));

var _SvmJs = _interopRequireDefault(require("./core/svm/SvmJs"));

var _SvmLinear = _interopRequireDefault(require("./core/svm/SvmLinear"));

var _SvmPerf = _interopRequireDefault(require("./core/svm/SvmPerf"));

var _WinnowHash = _interopRequireDefault(require("./core/winnow/WinnowHash"));

var _features = _interopRequireDefault(require("./features"));

var _formats = _interopRequireDefault(require("./formats"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  classifiers: {
    NeuralNetwork: _NeuralNetwork["default"],
    Bayesian: _bayesian["default"],
    SvmJs: _SvmJs["default"],
    SvmLinear: _SvmLinear["default"],
    SvmPerf: _SvmPerf["default"],
    Winnow: _WinnowHash["default"],
    DecisionTree: _DecisionTree["default"],
    multilabel: _multilabel["default"],
    EnhancedClassifier: _EnhancedClassifier["default"]
  },
  features: _features["default"],
  formats: _formats["default"],
  utils: _utils["default"]
};
exports["default"] = _default;