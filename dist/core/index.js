export const NeuralNetwork = require('./neural/NeuralNetwork');
export const Bayesian = require('./bayesian/bayesian');
export const kNN = require('./kNN/kNN');
export const SvmJs = require('./svm/SvmJs');
export const SvmPerf = require('./svm/SvmPerf');
export const SvmLinear = require('./svm/SvmLinear');
export const Perceptron = require('./perceptron/PerceptronHash');
export const Winnow = require('./winnow/WinnowHash');
export const DecisionTree = require('./decisiontree/DecisionTree');
export const multilabel = require('./multilabel');
export const EnhancedClassifier = require('./EnhancedClassifier'); // add a "classify and log" method to all classifiers, for demos:

for (var classifierClass in module.exports) {
  if (module.exports[classifierClass].prototype && module.exports[classifierClass].prototype.classify) module.exports[classifierClass].prototype.classifyAndLog = function (sample) {
    console.log(sample + " is " + this.classify(sample));
  };
}