---
sidebar: auto
type: guide
---

# neuro.js

[![npm](https://img.shields.io/npm/v/neuro.js.svg?style=plastic)](https://www.npmjs.com/package/neuro.js)
[![npm](https://img.shields.io/npm/dt/neuro.js.svg?style=plastic)](https://www.npmjs.com/package/neuro.js)
[![GitHub license](https://img.shields.io/github/license/intelligo-systems/neuro.js.svg)](https://github.com/intelligo-systems/neuro.js/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/intelligo-systems/neuro.js.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fintelligo-systems%2Fintelligo)

## Introduction

Neuro.js is machine learning framework for building AI assistants and chat-bots.

[![NPM](https://nodei.co/npm/neuro.js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/neuro.js/)

## Installation

```
npm install neuro.js --save
```

## Binary Classification

### Batch Learning - learn from an array of input-output pairs:

```js
var neuro = require("neuro.js");

var colorClassifier = new neuro.classifiers.NeuralNetwork();

colorClassifier.trainBatch([
  { input: { r: 0.03, g: 0.7, b: 0.5 }, output: 0 }, // black
  { input: { r: 0.16, g: 0.09, b: 0.2 }, output: 1 }, // white
  { input: { r: 0.5, g: 0.5, b: 1.0 }, output: 1 } // white
]);

console.log(colorClassifier.classify({ r: 1, g: 0.4, b: 0 })); // 0.99 - almost white
```

### Online Learning

```js
var birdClassifier = new neuro.classifiers.Winnow({
  default_positive_weight: 1,
  default_negative_weight: 1,
  threshold: 0
});

birdClassifier.trainOnline({ wings: 1, flight: 1, beak: 1, eagle: 1 }, 1); // eagle is a bird (1)
birdClassifier.trainOnline({ wings: 0, flight: 0, beak: 0, dog: 1 }, 0); // dog is not a bird (0)
console.dir(
  birdClassifier.classify({ wings: 1, flight: 0, beak: 0.5, penguin: 1 })
); // initially, penguin is mistakenly classified as 0 - "not a bird"
console.dir(
  birdClassifier.classify(
    { wings: 1, flight: 0, beak: 0.5, penguin: 1 },
    /*explanation level=*/ 4
  )
); // why? because it does not fly.

birdClassifier.trainOnline({ wings: 1, flight: 0, beak: 1, penguin: 1 }, 1); // learn that penguin is a bird, although it doesn't fly
birdClassifier.trainOnline({ wings: 0, flight: 1, beak: 0, bat: 1 }, 0); // learn that bat is not a bird, although it does fly
console.dir(
  birdClassifier.classify({ wings: 1, flight: 0, beak: 1, chicken: 1 })
); // now, chicken is correctly classified as a bird, although it does not fly.
console.dir(
  birdClassifier.classify(
    { wings: 1, flight: 0, beak: 1, chicken: 1 },
    /*explanation level=*/ 4
  )
); // why?  because it has wings and beak.
```

The "explanation" feature is explained below.

### Binding

Using Javascript's binding capabilities, it is possible to create custom classes, which are made of existing classes and pre-specified parameters:

```js
var MyWinnow = neuro.classifiers.Winnow.bind(0, {
	default_positive_weight: 1,
	default_negative_weight: 1,
	threshold: 0
});

var birdClassifier = new MyWinnow();
...
// continue as above
```

### Explanations

Some classifiers can return "explanations" - additional information that explains how the classification result has been derived:

```js
var colorClassifier = new neuro.classifiers.Bayesian();

colorClassifier.trainBatch([
  { input: { r: 0.03, g: 0.7, b: 0.5 }, output: "black" },
  { input: { r: 0.16, g: 0.09, b: 0.2 }, output: "white" },
  { input: { r: 0.5, g: 0.5, b: 1.0 }, output: "white" }
]);

console.log(
  colorClassifier.classify({ r: 1, g: 0.4, b: 0 }, /* explanation level = */ 1)
);
```

The explanation feature is experimental and is supported differently for different classifiers. For example, for the Bayesian classifier it returns the probabilities for each category:

```js
{ classes: 'white',
	explanation: [ 'white: 0.0621402182289608', 'black: 0.031460948468170505' ] }
```

While for the winnow classifier it returns the relevance (feature-value times feature-weight) for each feature:

```js
{ classification: 1,
	explanation: [ 'bias+1.12', 'r+1.08', 'g+0.25', 'b+0.00' ] }
```

WARNING: The internal format of the explanations might change without notice. The explanations should be used for presentation purposes only (and not, for example, for extracting the actual numbers).

## Multi-Label Classification

In binary classification, the output is 0 or 1;

In multi-label classification, the output is a set of zero or more labels.

```js
var MyWinnow = neuro.classifiers.Winnow.bind(0, { retrain_count: 10 });

var intentClassifier = new neuro.classifiers.multilabel.BinaryRelevance({
  binaryClassifierType: MyWinnow
});

intentClassifier.trainBatch([
  { input: { I: 1, want: 1, an: 1, apple: 1 }, output: "APPLE" },
  { input: { I: 1, want: 1, a: 1, banana: 1 }, output: "BANANA" },
  { input: { I: 1, want: 1, chips: 1 }, output: "CHIPS" }
]);

console.dir(
  intentClassifier.classify({
    I: 1,
    want: 1,
    an: 1,
    apple: 1,
    and: 1,
    a: 1,
    banana: 1
  })
); // ['APPLE','BANANA']
```

## Feature engineering

### Feature extraction - converting an input sample into feature-value pairs:

```js
// First, define our base classifier type (a multi-label classifier based on winnow):
var TextClassifier = neuro.classifiers.multilabel.BinaryRelevance.bind(0, {
  binaryClassifierType: neuro.classifiers.Winnow.bind(0, { retrain_count: 10 })
});

// Now define our feature extractor - a function that takes a sample and adds features to a given features set:
var WordExtractor = function(input, features) {
  input.split(" ").forEach(function(word) {
    features[word] = 1;
  });
};

// Initialize a classifier with the base classifier type and the feature extractor:
var intentClassifier = new neuro.classifiers.EnhancedClassifier({
  classifierType: TextClassifier,
  featureExtractor: WordExtractor
});

// Train and test:
intentClassifier.trainBatch([
  { input: "I want an apple", output: "apl" },
  { input: "I want a banana", output: "bnn" },
  { input: "I want chips", output: "cps" }
]);

console.dir(intentClassifier.classify("I want an apple and a banana")); // ['apl','bnn']
console.dir(intentClassifier.classify("I WANT AN APPLE AND A BANANA")); // []
```

As you can see from the last example, by default feature extraction is case-sensitive.
We will take care of this in the next example.

Instead of defining your own feature extractor, you can use those already bundled with neuro:

```js
neuro.features.NGramsOfWords;
neuro.features.NGramsOfLetters;
neuro.features.HypernymExtractor;
```

You can also make 'featureExtractor' an array of several feature extractors, that will be executed in the order you include them.

### Input Normalization

```js
//Initialize a classifier with a feature extractor and a case normalizer:
intentClassifier = new neuro.classifiers.EnhancedClassifier({
  classifierType: TextClassifier, // same as in previous example
  normalizer: neuro.features.LowerCaseNormalizer,
  featureExtractor: WordExtractor // same as in previous example
});

//Train and test:
intentClassifier.trainBatch([
  { input: "I want an apple", output: "apl" },
  { input: "I want a banana", output: "bnn" },
  { input: "I want chips", output: "cps" }
]);

console.dir(intentClassifier.classify("I want an apple and a banana")); // ['apl','bnn']
console.dir(intentClassifier.classify("I WANT AN APPLE AND A BANANA")); // ['apl','bnn']
```

Of course you can use any other function as an input normalizer. For example, if you know how to write a spell-checker, you can create a normalizer that corrects typos in the input.

You can also make 'normalizer' an array of several normalizers. These will be executed in the order you include them.

### Feature lookup table

This example uses the quadratic SVM implementation [svm.js, by Andrej Karpathy](https://github.com/karpathy/svmjs).
This SVM (like most SVM implementations) works with integer features, so we need a way to convert our string-based features to integers.

```js
var neuro = require("neuro.js");

// First, define our base classifier type (a multi-label classifier based on svm.js):
var TextClassifier = neuro.classifiers.multilabel.BinaryRelevance.bind(0, {
  binaryClassifierType: neuro.classifiers.SvmJs.bind(0, { C: 1.0 })
});

// Initialize a classifier with a feature extractor and a lookup table:
var intentClassifier = new neuro.classifiers.EnhancedClassifier({
  classifierType: TextClassifier,
  featureExtractor: neuro.features.NGramsOfWords(1), // each word ("1-gram") is a feature
  featureLookupTable: new neuro.features.FeatureLookupTable()
});

// Train and test:
intentClassifier.trainBatch([
  { input: "I want an apple", output: "apl" },
  { input: "I want a banana", output: "bnn" },
  { input: "I want chips", output: "cps" }
]);

console.dir(intentClassifier.classify("I want an apple and a banana")); // ['apl','bnn']
```

The FeatureLookupTable takes care of the numbers, while you may continue to work with texts!

## Cross-validation

```js
// create a dataset with a lot of input-output pairs:
var dataset = [ ... ];

// Decide how many folds you want in your   k-fold cross-validation:
var numOfFolds = 5;

// Define the type of classifier that you want to test:
var IntentClassifier = neuro.classifiers.EnhancedClassifier.bind(0, {
	classifierType: neuro.classifiers.multilabel.BinaryRelevance.bind(0, {
		binaryClassifierType: neuro.classifiers.Winnow.bind(0, {retrain_count: 10})
	}),
	featureExtractor: neuro.features.NGramsOfWords(1),
});

var microAverage = new neuro.utils.PrecisionRecall();
var macroAverage = new neuro.utils.PrecisionRecall();

neuro.utils.partitions.partitions(dataset, numOfFolds, function(trainSet, testSet) {
	console.log("Training on "+trainSet.length+" samples, testing on "+testSet.length+" samples");
	var classifier = new IntentClassifier();
	classifier.trainBatch(trainSet);
	neuro.utils.test(classifier, testSet, /* verbosity = */0,
		microAverage, macroAverage);
});

macroAverage.calculateMacroAverageStats(numOfFolds);
console.log("\n\nMACRO AVERAGE:"); console.dir(macroAverage.fullStats());

microAverage.calculateStats();
console.log("\n\nMICRO AVERAGE:"); console.dir(microAverage.fullStats());
```

## Back-classification

Use this option to get the list of all samples with a given class.

```js
var intentClassifier = new neuro.classifiers.EnhancedClassifier({
  classifierType: neuro.classifiers.multilabel.BinaryRelevance.bind(0, {
    binaryClassifierType: neuro.classifiers.Winnow.bind(0, {
      retrain_count: 10
    })
  }),
  featureExtractor: neuro.features.NGramsOfWords(1),
  pastTrainingSamples: []
});

// Train and test:
intentClassifier.trainBatch([
  { input: "I want an apple", output: "apl" },
  { input: "I want a banana", output: "bnn" },
  { input: "I really want an apple", output: "apl" },
  { input: "I want a banana very much", output: "bnn" }
]);

console.dir(intentClassifier.backClassify("apl")); // [ 'I want an apple', 'I really want an apple' ]
```

## SVM wrappers

The native svm.js implementation takes a lot of time to train - quadratic in the number of training samples.
There are two common packages that can be trained in time linear in the number of training samples. They are:

- [SVM-Perf](http://www.cs.cornell.edu/people/tj/svm_light/svm_perf.html) - by Thorsten Joachims;
- [LibLinear](http://www.csie.ntu.edu.tw/~cjlin/liblinear) - Fan, Chang, Hsieh, Wang and Lin.

The neuro.js package provides wrappers for these implementations.
In order to use the wrappers, you must have the binary file used for training in your path, that is:

- **svm_perf_learn** - from [SVM-Perf](http://www.cs.cornell.edu/people/tj/svm_light/svm_perf.html).
- **liblinear_train** - from [LibLinear](http://www.csie.ntu.edu.tw/~cjlin/liblinear).

Once you have any one of these installed, you can use the corresponding classifier instead of any binary classifier
used in the previous demos, as long as you have a feature-lookup-table. For example, with SvmPerf:

```js
var intentClassifier = new neuro.classifiers.EnhancedClassifier({
  classifierType: neuro.classifiers.multilabel.BinaryRelevance.bind(0, {
    binaryClassifierType: neuro.classifiers.SvmPerf.bind(0, {
      learn_args: "-c 20.0"
    })
  }),
  featureExtractor: neuro.features.NGramsOfWords(1),
  featureLookupTable: new neuro.features.FeatureLookupTable()
});
```

and similarly with SvmLinear.

See the files classifiers/svm/SvmPerf.js and classifiers/svm/SvmLinear.js for a documentation of the options.

## Contributors

You may contribute in several ways like creating new features, fixing bugs, improving documentation and examples
or translating any document here to your language. [Find more information in CODE_OF_CONDUCT.md](.github/CODE_OF_CONDUCT.md).
<a href="https://github.com/intelligo-systems/neuro.js/graphs/contributors">Contributors</a>

## License

> Copyright (C) 2019 Intelligo Systems.  
> neuro.js is open-sourced software licensed under the [MIT](https://opensource.org/licenses/MIT) license.  
> (See the [LICENSE](https://github.com/intelligo-systems/neuro.js/blob/master/LICENSE) file for the whole license text.)

**[⬆ back to top](#neurojs)**

[installation]: #installation
[usage]: #usage
[contributors]: #contributors
[license]: #license
