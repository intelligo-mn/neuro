/**
 * a unit-test for Enhanced Classifier
 */

import { _ } from "underscore";
import { EnhancedClassifier, NeuralNetwork } from "../../dist/core";
import { NGramsOfWords } from "../../dist/features";

var RegexpTokenizer = function(options) {
  var options = options || {};
  this._pattern = options.pattern || this._pattern;
};

RegexpTokenizer.prototype.tokenize = function(s) {
  var results = s.split(this._pattern);
  return _.without(results, "", " ");
};

try {
  var wordsworth = require("wordsworth");
  var isTestRelevant = true;
} catch (e) {
  var isTestRelevant = false;
}

describe("baseline - classifier without a spell-checker", function() {
  it("errs on sentences with spelling mistakes", function() {
    var spamClassifier = new EnhancedClassifier({
      classifierType: NeuralNetwork,
      featureExtractor: NGramsOfWords(1),
      spellChecker: null
    });

    spamClassifier.trainBatch([
      {
        input: "cheap watches",
        output: [1]
      },
      {
        input: "",
        output: [0]
      }
    ]);

    spamClassifier.classify("cheap watches").should.be.above(0.6); // (spam)
    spamClassifier.classify("cheep watchs").should.be.below(0.4); // (not spam)
    spamClassifier.classify("expensive clocks").should.be.below(0.4); // (not spam)
  });
});

describe("classifier with spell-checker", function() {
  it(
    "classifies sentences with spelling mistakes correctly",
    isTestRelevant
      ? function() {
          var spamClassifier = new EnhancedClassifier({
            classifierType: NeuralNetwork,
            featureExtractor: NGramsOfWords(1),
            tokenizer: new RegexpTokenizer({
              pattern: /[^a-zA-Z0-9%'$,]+/
            }),
            spellChecker: [wordsworth.getInstance(), wordsworth.getInstance()]
          });

          spamClassifier.trainBatch([
            {
              input: "cheap watches",
              output: [1]
            },
            {
              input: "",
              output: [0]
            }
          ]);

          spamClassifier.classify("cheap watches").should.be.above(0.9); // (spam)
          //spamClassifier.classify("cheep watchs").should.be.above(0.9);  // (not spam)
          spamClassifier.classify("expensive clocks").should.be.below(0.4); // (not spam)
        }
      : null
  );
});

const _RegexpTokenizer = RegexpTokenizer;
export { _RegexpTokenizer as RegexpTokenizer };
