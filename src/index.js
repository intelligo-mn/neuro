import Bayesian from "./core/bayesian/bayesian";
import DecisionTree from "./core/decisiontree/DecisionTree";
import EnhancedClassifier from "./core/EnhancedClassifier";
import multilabel from "./core/multilabel";
import NeuralNetwork from "./core/neural/NeuralNetwork";
import SvmJs from "./core/svm/SvmJs";
import SvmLinear from "./core/svm/SvmLinear";
import SvmPerf from "./core/svm/SvmPerf";
import Winnow from "./core/winnow/WinnowHash";
import features from "./features";
import formats from "./formats";
import utils from "./utils";

export default {
  classifiers: {
    NeuralNetwork,
    Bayesian,
    SvmJs,
    SvmLinear,
    SvmPerf,
    Winnow,
    DecisionTree,
    multilabel,
    EnhancedClassifier
  },
  features,
  formats,
  utils
};
